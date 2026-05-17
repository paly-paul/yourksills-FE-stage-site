"use client";

import Image from "next/image";
import { useState } from "react";

interface SocialButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='cursor-pointer flex-1 flex items-center justify-center py-2 rounded-lg btn-shadow bg-gray-50/40 text-sm text-title-black transition disabled:opacity-50 disabled:cursor-not-allowed'>
      <Image src={icon} alt={label} width={20} height={20} className='mr-2' />
      {label}
    </button>
  );
};

export const SocialSignIn = () => {
  const [oauthError, setOauthError] = useState("");

  const startOAuth = (provider: "google" | "linkedin") => {
    const url =
      provider === "google"
        ? process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL
        : process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL;

    if (!url) {
      setOauthError(
        `${provider === "google" ? "Google" : "LinkedIn"} sign-in is not configured yet.`
      );
      return;
    }

    setOauthError("");
    window.location.href = url;
  };

  return (
    <>
      <div className='flex space-x-4'>
        <SocialButton
          icon='/icons/google-color.svg'
          label='Google'
          onClick={() => startOAuth("google")}
        />
        <SocialButton
          icon='/icons/linkedin-color.svg'
          label='LinkedIn'
          onClick={() => startOAuth("linkedin")}
        />
      </div>
      {oauthError ? <p className='text-red-900 text-sm mt-3'>{oauthError}</p> : null}
    </>
  );
};
