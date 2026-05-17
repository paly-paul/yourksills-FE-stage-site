"use client";

import { create } from "zustand";

const TOKEN_KEY = "authToken";
const isSecureContext = () =>
  typeof window !== "undefined" && window.location.protocol === "https:";

const getCookieOptions = (expires?: Date) => {
  const baseOptions = [`path=/`, "SameSite=Strict"];

  if (expires) {
    baseOptions.push(`expires=${expires.toUTCString()}`);
  }

  if (isSecureContext()) {
    baseOptions.push("Secure");
  }

  return baseOptions.join("; ");
};

const getTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  const name = `${TOKEN_KEY}=`;
  const cookies = decodeURIComponent(document.cookie).split(";");

  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name)) {
      const token = c.substring(name.length).trim();
      if (
        !token ||
        token.toLowerCase() === "undefined" ||
        token.toLowerCase() === "null"
      ) {
        return null;
      }
      return token;
    }
  }
  return null;
};

const setTokenCookie = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  document.cookie = `${TOKEN_KEY}=${token}; ${getCookieOptions(expires)}`;
};

const removeTokenCookie = () => {
  const expiredDate = new Date(0);
  document.cookie = `${TOKEN_KEY}=; ${getCookieOptions(expiredDate)}`;
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  setToken: (token) => {
    const normalized = typeof token === "string" ? token.trim() : "";

    // If upstream login fails, avoid persisting an empty token as "authenticated".
    const lower = normalized.toLowerCase();
    if (
      !normalized ||
      lower === "undefined" ||
      lower === "null"
    ) {
      removeTokenCookie();
      set({
        token: null,
        isAuthenticated: false,
      });
      return;
    }

    setTokenCookie(normalized);
    set({
      token: normalized,
      isAuthenticated: true,
    });
  },

  logout: () => {
    removeTokenCookie();
    set({
      token: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const token = getTokenFromCookie();
    const normalized = token ? token : null;
    set({
      token: normalized,
      isAuthenticated: !!normalized,
    });
  },
}));
