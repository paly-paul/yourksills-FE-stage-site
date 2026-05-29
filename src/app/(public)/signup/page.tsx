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

const SuccessPopup = ({ onContinue }: { onContinue: () => void }) => (
  <>
    <style>{`
      @keyframes sp-backdrop {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes sp-card {
        0%   { opacity: 0; transform: translateY(32px) scale(0.94); }
        60%  { opacity: 1; transform: translateY(-4px) scale(1.01); }
        100% { opacity: 1; transform: translateY(0)   scale(1);    }
      }
      @keyframes sp-icon {
        0%   { opacity: 0; transform: scale(0.4); }
        65%  { transform: scale(1.15); }
        85%  { transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes sp-check {
        from { stroke-dashoffset: 40; opacity: 0; }
        to   { stroke-dashoffset: 0;  opacity: 1; }
      }
      @keyframes sp-fade-up {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes sp-divider {
        from { opacity: 0; transform: scaleX(0); }
        to   { opacity: 1; transform: scaleX(1); }
      }
    `}</style>

    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        style={{ animation: "sp-backdrop 0.25s ease forwards" }}
        onClick={onContinue}
      />

      <div
        className='relative w-full max-w-sm bg-white rounded-2xl p-8 flex flex-col items-center gap-5 text-center'
        style={{
          boxShadow: "0px 24px 64px 0px rgba(100, 100, 255, 0.22)",
          animation: "sp-card 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        <div
          className='w-20 h-20 rounded-full flex items-center justify-center'
          style={{
            background:
              "linear-gradient(135deg, #8052fe 0%, #7a62fd 50%, #4dd4f8 100%)",
            animation:
              "sp-icon 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
          }}
        >
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 20.5L16.5 29L32 13'
              stroke='white'
              strokeWidth='3.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeDasharray='40'
              style={{
                animation: "sp-check 0.4s ease 0.55s both",
              }}
            />
          </svg>
        </div>

        <div
          className='space-y-2'
          style={{ animation: "sp-fade-up 0.35s ease 0.45s both" }}
        >
          <h3 className='text-2xl font-semibold text-title-black'>
            Account Created!
          </h3>
          <p className='text-grey text-sm leading-relaxed'>
            Welcome to Skill Snapshot. Your account is ready — let&apos;s build
            your profile.
          </p>
        </div>

        <div
          className='w-12 h-1 rounded-full origin-left'
          style={{
            background:
              "linear-gradient(90deg, #8052fe 0%, #7a62fd 50%, #4dd4f8 100%)",
            animation: "sp-divider 0.4s ease 0.6s both",
          }}
        />

        <div
          className='w-full'
          style={{ animation: "sp-fade-up 0.35s ease 0.65s both" }}
        >
          <AccentButton
            text="Let's get started"
            classes='text-base w-full'
            action={onContinue}
          />
        </div>

        <p
          className='text-xs text-light-grey'
          style={{ animation: "sp-fade-up 0.35s ease 0.75s both" }}
        >
          Redirecting you automatically in 5 seconds…
        </p>
      </div>
    </div>
  </>
);

export default function SignupPage() {
  const router = useRouter(),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [validation, setValidation] = useState(""),
    [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);
  const resetFlow = useCvFlowStore((s) => s.resetFlow);

  const navigateToCreate = () => router.push("/create");

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
        setShowSuccessPopup(true);
        setTimeout(navigateToCreate, 5000);
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
    <>
      {showSuccessPopup && <SuccessPopup onContinue={navigateToCreate} />}
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
    </>
  );
}
