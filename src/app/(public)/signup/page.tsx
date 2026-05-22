"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { BackButton } from "@/components/BackButton";
import { AccentButton } from "@/components/CustomButton";
import { LeftBanner } from "@/components/LeftBanner";
import { SocialSignIn } from "@/components/SocialSignIn";
import { TextField } from "@/components/TextField";
import { useRegisterMutation } from "@/hooks/auth/registerHook";
import { useAuthStore } from "@/store/useAuthStore";
import { useCvFlowStore } from "@/store/useCvFlowStore";

export default function SignupPage() {
  const router = useRouter(),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [validation, setValidation] = useState("");

  const setToken = useAuthStore((s) => s.setToken);
  const resetFlow = useCvFlowStore((s) => s.resetFlow);

  const { mutate: registerUser, isPending } = useRegisterMutation({
    onSuccess: (data: {
      success?: unknown;
      reason?: string;
      token?: unknown;
    }) => {
      const successRaw = data.success;
      const success =
        successRaw === true ||
        successRaw === "true" ||
        successRaw === 1 ||
        successRaw === "1";

      const token = typeof data.token === "string" ? data.token : "";

      if (success) {
        resetFlow();
        try {
          sessionStorage.removeItem("create.currentScreen");
        } catch {
          // ignore storage failures
        }
        // Same as login: persist cookie and sync Zustand so the header shows
        // profile / logout on client navigation (AuthHydrator only hydrates once).
        if (token) setToken(token);
        router.push("/create");
      } else {
        setToken("");
        setValidation(data.reason || "Signup failed. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ first_name: firstName, last_name: lastName, username, email, password });
  };

  return (
    <main className='gradient-bg'>
      <div className='min-h-screen container flex flex-col md:flex-row items-center h-full'>
        <LeftBanner />
        <div className='w-full mb-8 mt-4 md:hidden'>
          <BackButton to='/' />
        </div>

        <div className='md:w-1/2 flex items-center justify-center p-10'>
          <div className='w-full max-w-md space-y-5'>

            <div className='hidden md:block'>
              <BackButton to='/' />
            </div>

            <h2 className='text-3xl font-semibold text-title-black'>
              Hi! Welcome to Skill Snapshot
            </h2>
            <p className='text-base text-grey'>Let&apos;s get started.</p>

            <form className='space-y-4 mt-10' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <TextField
                  type='text'
                  label='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isRequired={true}
                />
                <TextField
                  type='text'
                  label='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isRequired={true}
                />
              </div>
              <TextField
                type='text'
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isRequired={true}
              />
              <TextField
                type='email'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
              />
              <TextField
                type='password'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
              />

              <AccentButton
                type='submit'
                text={isPending ? "Creating Account..." : "Create my account"}
                classes={"text-lg w-full"}
                disabled={isPending}
              />
              <p className='text-red-900 text-sm'>{validation}</p>
            </form>

            <div className='flex items-center my-4'>
              <hr className='flex-grow border-t border-light-grey/30' />
              <span className='mx-2 text-grey'>Or Signup with</span>
              <hr className='flex-grow border-t border-light-grey/30' />
            </div>

            <SocialSignIn />

            <p className='text-center text-grey mt-4'>
              Already have an account?{" "}
              <Link href='/login' className='text-purple font-semibold'>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
