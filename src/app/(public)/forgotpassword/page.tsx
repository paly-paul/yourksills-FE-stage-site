"use client";

import Link from "next/link";
import { AccentButton } from "@/components/CustomButton";
import React, { useState } from "react";
import { TextField } from "@/components/TextField";
import { LeftBanner } from "@/components/LeftBanner";
import { BackButton } from "@/components/BackButton";
import { SocialSignIn } from "@/components/SocialSignIn";
import publicInstance from "@/utils/axiosPublicInstance";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await publicInstance.post<{ success: boolean; message: string }>(
        "/forgot-password",
        { email }
      );
      router.push(`/forgotpassword/otp?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setErrorMessage(err.response?.data?.message || "Unable to send reset link. Please try again.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to send reset link. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='gradient-bg'>
      <div className='min-h-screen container flex flex-col md:flex-row items-center h-full'>
        <LeftBanner />
        <div className='w-full mb-8 mt-4 md:hidden'>
          <BackButton to='/login' />
        </div>

        <div className='md:w-1/2 flex items-center justify-center p-10 relative'>
          <div className='w-full max-w-md space-y-5'>
            <div className='hidden md:block'>
              <BackButton to='/login' />
            </div>

            <h2 className='text-3xl font-semibold text-title-black'>
              Forgot your password?
            </h2>
            <p className='text-base text-grey'>
              Enter your email address and we&apos;ll send you an OTP to reset your password.
            </p>

            <form className='space-y-4 mt-10' onSubmit={handleSubmit}>
              <TextField
                type='email'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
              />

              <AccentButton
                type='submit'
                text={isSubmitting ? "Sending OTP..." : "Send OTP"}
                classes={"text-lg w-full"}
                disabled={isSubmitting}
              />
              {errorMessage ? (
                <p className='text-red-900 text-sm'>{errorMessage}</p>
              ) : null}
            </form>

            <div className='flex items-center my-4'>
              <hr className='flex-grow border-t border-light-grey/30' />
              <span className='mx-2 text-grey'>Or Login with</span>
              <hr className='flex-grow border-t border-light-grey/30' />
            </div>

            <SocialSignIn />

            <p className='text-center text-grey mt-4'>
              Remembered your password?{" "}
              <Link href='/login' className='text-purple font-semibold'>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
