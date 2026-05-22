"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, Suspense } from "react";
import { AccentButton } from "@/components/CustomButton";
import { LeftBanner } from "@/components/LeftBanner";
import { BackButton } from "@/components/BackButton";
import { TextField } from "@/components/TextField";
import publicInstance from "@/utils/axiosPublicInstance";

const OTP_LENGTH = 6;

const SuccessPopup = ({ onGoToLogin }: { onGoToLogin: () => void }) => (
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
        onClick={onGoToLogin}
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
            Password Reset!
          </h3>
          <p className='text-grey text-sm leading-relaxed'>
            Your password has been updated successfully. You can now log in
            with your new password.
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
            text='Go to Login'
            classes='text-base w-full'
            action={onGoToLogin}
          />
        </div>

        <p
          className='text-xs text-light-grey'
          style={{ animation: "sp-fade-up 0.35s ease 0.75s both" }}
        >
          Redirecting you automatically in a moment…
        </p>
      </div>
    </div>
  </>
);

function ForgotPasswordOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const passwordMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const focusBox = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    if (val && index < OTP_LENGTH - 1) focusBox(index + 1);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusBox(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!digits) return;
    const next = [...otp];
    digits.split("").forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    focusBox(Math.min(digits.length, OTP_LENGTH - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setErrorMessage("Please enter all 6 digits.");
      return;
    }
    if (!newPassword) {
      setErrorMessage("Please enter your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await publicInstance.post<{ success: boolean; message: string }>(
        "/reset-password",
        { email, otp: code, new_password: newPassword }
      );
      setShowSuccessPopup(true);
      setTimeout(() => router.push("/login"), 4000);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setErrorMessage(
          err.response?.data?.message ||
            "Invalid or expired OTP. Please try again."
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    router.push(`/forgotpassword`);
  };

  return (
    <>
      {showSuccessPopup && (
        <SuccessPopup onGoToLogin={() => router.push("/login")} />
      )}

      <main className='gradient-bg'>
        <div className='min-h-screen container flex flex-col md:flex-row items-center h-full'>
          <LeftBanner />
          <div className='w-full mb-8 mt-4 md:hidden'>
            <BackButton to='/forgotpassword' />
          </div>

          <div className='md:w-1/2 flex items-center justify-center p-10 relative'>
            <div className='w-full max-w-md space-y-5'>
              <div className='hidden md:block'>
                <BackButton to='/forgotpassword' />
              </div>

              <h2 className='text-3xl font-semibold text-title-black'>
                Check your email
              </h2>
              <p className='text-base text-grey'>
                We sent a 6-digit OTP to{" "}
                {email ? (
                  <span className='font-medium text-title-black'>{email}</span>
                ) : (
                  "your email"
                )}
                . Enter it below to continue.
              </p>

              <form className='space-y-6 mt-10' onSubmit={handleSubmit}>
                <div className='flex gap-3 justify-between'>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={handlePaste}
                      className='w-full aspect-square text-center text-xl font-semibold text-title-black bg-white btn-shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  ))}
                </div>

                <TextField
                  type='password'
                  label='New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  isRequired={true}
                />

                <div className='space-y-1'>
                  <TextField
                    type='password'
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isRequired={true}
                  />
                  {passwordMismatch && (
                    <p className='text-sm' style={{ color: "#fa5252" }}>
                      Passwords do not match.
                    </p>
                  )}
                </div>

                <AccentButton
                  type='submit'
                  text={isSubmitting ? "Resetting password..." : "Verify & Reset Password"}
                  classes={"text-lg w-full"}
                  disabled={isSubmitting || passwordMismatch}
                />

                {errorMessage ? (
                  <p className='text-sm' style={{ color: "#fa5252" }}>
                    {errorMessage}
                  </p>
                ) : null}
              </form>

              <p className='text-center text-grey mt-4'>
                Didn&apos;t receive the code?{" "}
                <button
                  type='button'
                  onClick={handleResend}
                  className='text-purple font-semibold cursor-pointer'
                >
                  Resend OTP
                </button>
              </p>

              <p className='text-center text-grey mt-2'>
                Remembered your password?{" "}
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
};

export default function ForgotPasswordOtpPage() {
  return (
    <Suspense
      fallback={
        <main className='gradient-bg min-h-screen'>
          <div className='container min-h-screen flex items-center justify-center'>
            <p className='text-grey text-base'>Loading...</p>
          </div>
        </main>
      }
    >
      <ForgotPasswordOtp />
    </Suspense>
  );
}
