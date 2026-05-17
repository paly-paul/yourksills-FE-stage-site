import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import AuthHydrator from "./AuthHydrator";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSnap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={outfit.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`font-[family-name:var(--font-outfit)] antialiased text-base`}>
        <ReactQueryProvider>
          <AuthHydrator />
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
