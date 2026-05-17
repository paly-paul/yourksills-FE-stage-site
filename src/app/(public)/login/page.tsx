"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { AccentButton } from "@/components/CustomButton";
import { TextField } from "@/components/TextField";
import { LeftBanner } from "@/components/LeftBanner";
import { BackButton } from "@/components/BackButton";
import { SocialSignIn } from "@/components/SocialSignIn";
import { useLoginMutation } from "@/hooks/auth/loginHook";
import { useAuthStore } from "@/store/useAuthStore";
import { useCvFlowStore } from "@/store/useCvFlowStore";

// type LoginRequestBody = {
//   email: string;
//   password: string;
// };

// const buildLoginRequestBody = (
//   input: string,
//   password: string
// ): LoginRequestBody => {
//   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

//   return {
//     username: isEmail ? "" : input,
//     email: isEmail ? input : "",
//     password,
//   };
// };

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const resetFlow = useCvFlowStore((s) => s.resetFlow);

  const { mutateAsync: loginUser, isPending } = useLoginMutation({
    onSuccess: (data: {
      success?: unknown;
      reason?: string;
      token?: unknown;
    }) => {
      const successRaw = data.success;
      // Backend sometimes returns "true"/"false" as strings.
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
        // If backend returned token we store it; otherwise cookie-based auth
        // (Set-Cookie) can still make the private routes work.
        if (token) setToken(token);
        router.push("/create");
      } else {
        // Make sure we don't accidentally land in the private flow.
        setToken("");
        setValidation(data.reason || "Login failed. Please try again.");
      }
    },
    onError: (error: unknown) => {
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error: dynamic error shape from axios
        setValidation(error.response?.data?.message || error.message || "Something went wrong. Please try again.");
      } else if (error instanceof Error) {
        setValidation(error.message);
      } else {
        setValidation("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const requestBody = buildLoginRequestBody(email, password);
    loginUser({ email, password });
  };

  React.useEffect(() => {
    const socialError = searchParams.get("social_error");
    if (socialError) setValidation(socialError);
  }, [searchParams]);

  return (
    <main className='gradient-bg'>
      <div className='min-h-screen container flex flex-col md:flex-row items-center h-full'>
        <LeftBanner />
          <div className='w-full mb-8 mt-4 md:hidden'>
            <BackButton to='/' />
          </div>

        <div className='md:w-1/2 flex flex-col items-center justify-center p-10 relative'>
          <div className='w-full max-w-md space-y-5'>
            <div className='hidden md:block'>
              <BackButton to='/' />
            </div>

            <h2 className='text-3xl font-semibold text-title-black'>
              Welcome Back!
            </h2>

            <form className='space-y-4 mt-10' onSubmit={handleSubmit}>
              <TextField
                type='text'
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

              <Link
                href='/forgotpassword'
                className='text-grey text-xs mb-8 block'>
                Forgot Password?
              </Link>

              <AccentButton
                type='submit'
                text={isPending ? "Logging in..." : "Login"}
                classes={"text-lg w-full"}
                disabled={isPending}
              />
              <p className='text-red-900 text-sm'>{validation}</p>
            </form>

            <div className='flex items-center my-4'>
              <hr className='flex-grow border-t border-light-grey/30' />
              <span className='mx-2 text-grey'>Or Login with</span>
              <hr className='flex-grow border-t border-light-grey/30' />
            </div>

            <SocialSignIn />

            <p className='text-center text-grey mt-4'>
              Don&apos;t have an account?{" "}
              <Link href='/signup' className='text-purple font-semibold'>
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
