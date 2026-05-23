"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

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
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const resetFlow = useCvFlowStore((s) => s.resetFlow);
  const googleAuthMutation = useGoogleAuth();
  const [oauthError, setOauthError] = useState("");
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const handleGoogleCredential = useCallback(
    (credential: string) => {
      setOauthError("");
      googleAuthMutation.mutate(credential, {
        onSuccess: (data) => {
          const successRaw = data.success;
          const success =
            successRaw === true ||
            successRaw === "true" ||
            successRaw === "1";

          const token = typeof data.token === "string" ? data.token : "";

          if (success) {
            resetFlow();
            try {
              sessionStorage.removeItem("create.currentScreen");
            } catch {
              // ignore storage failures
            }
            if (token) setToken(token);
            router.push("/create");
          } else {
            setOauthError(data.reason || data.message || "Google sign-in failed. Please try again.");
          }
        },
        onError: (err) => {
          const axiosErr = err as {
            response?: { data?: { message?: string } };
          };
          setOauthError(
            axiosErr.response?.data?.message ||
              err.message ||
              "Google sign-in failed. Please try again."
          );
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, setToken, resetFlow]
  );

  const handleGoogleCredentialRef = useRef(handleGoogleCredential);
  useEffect(() => {
    handleGoogleCredentialRef.current = handleGoogleCredential;
  }, [handleGoogleCredential]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || !googleBtnRef.current) return;

    const container = googleBtnRef.current;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          handleGoogleCredentialRef.current(response.credential);
        },
      });
      // renderButton bypasses FedCM entirely — works in all browsers
      window.google?.accounts.id.renderButton(container, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: container.offsetWidth,
      });
    };
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const startLinkedInAuth = () => {
    const url = process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL;
    if (!url) {
      setOauthError("LinkedIn sign-in is not configured yet.");
      return;
    }
    setOauthError("");
    window.location.href = url;
  };

  return (
    <>
      <div className='flex space-x-4 items-center justify-center'>
        {/* Google button rendered by GSI — handles popup auth without FedCM */}
        <div ref={googleBtnRef} className='flex-1 flex justify-center' />

        {/* <SocialButton
          icon='/icons/linkedin-color.svg'
          label='LinkedIn'
          onClick={startLinkedInAuth}
        /> */}
      </div>
      {googleAuthMutation.isPending && (
        <p className='text-grey text-sm mt-2 text-center'>Signing in with Google...</p>
      )}
      {oauthError ? (
        <p className='text-red-900 text-sm mt-3'>{oauthError}</p>
      ) : null}
    </>
  );
};
