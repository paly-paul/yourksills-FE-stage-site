"use client";

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

export const getAuthToken = () => {
  if (typeof document === "undefined") return null; // SSR safe

  const name = `${TOKEN_KEY}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

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

export const setAuthToken = (token: string) => {
  const normalized = token?.trim() || "";
  if (
    !normalized ||
    normalized.toLowerCase() === "undefined" ||
    normalized.toLowerCase() === "null"
  ) {
    removeAuthToken();
    return;
  }
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `${TOKEN_KEY}=${normalized}; ${getCookieOptions(expires)}`;
};

export const removeAuthToken = () => {
  const expiredDate = new Date(0);
  document.cookie = `${TOKEN_KEY}=; ${getCookieOptions(expiredDate)}`;
};
