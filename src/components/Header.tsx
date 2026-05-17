"use client";

import Image from "next/image";
import Link from "next/link";
import { AccentButton, BorderButton } from "./CustomButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useQueryClient } from "@tanstack/react-query";
import { FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const resetFlow = useCvFlowStore((s) => s.resetFlow);
  const pathname = usePathname();
  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const isHomePage = pathname === "/";
  const isPrivatePage =
    pathname.startsWith("/create") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile");
  const router = useRouter();
  const queryClient = useQueryClient();

  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Use refs for outside click detection
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = () => {
    resetFlow();
    try {
      sessionStorage.removeItem("create.currentScreen");
    } catch {
      // ignore storage failures
    }
    logout();
    queryClient.clear();
    router.replace("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        navOpen &&
        navRef.current &&
        !navRef.current.contains(target) &&
        !navButtonRef.current?.contains(target)
      ) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);

  // Prevent hydration mismatch by returning a simplified server version
  // that matches the browser's initial render state.
  if (!mounted) {
    return (
      <header className='bg-indigo-50/18 backdrop-blur-xl sticky top-0 z-20 h-header-height'>
        <div className='flex justify-between items-center py-4 container mx-auto px-[5%] md:px-0'>
          <Link href="/">
            <Image
              src='/logo.png'
              alt='Logo'
              width={200}
              height={200}
              priority
              className='w-24 md:w-40 lg:w-[200px] h-auto'
            />
          </Link>
          <div className='flex items-center gap-1 md:gap-5'>
            <div className='w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100/50' />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className='bg-indigo-50/18 backdrop-blur-xl sticky top-0 z-20 h-header-height'>
        <div className='flex justify-between items-center py-4 container mx-auto px-[5%] md:px-0'>
          <Link href={`${isAuthenticated ? "/create" : "/"}`}>
            <Image
              src='/logo.png'
              alt='Logo'
              width={200}
              height={200}
              priority
              className='w-24 md:w-40 lg:w-[200px] h-auto'
            />
          </Link>

        <div className='flex items-center gap-1 md:gap-5'>
          {/* Mobile Menu Toggle (Hamburger) - only on public pages */}
          {!isPrivatePage && (isSignupPage || isHomePage || isLoginPage) && (
            <div className='md:hidden relative'>
              <button
                ref={navButtonRef}
                onClick={() => setNavOpen((prev) => !prev)}
                className='p-2 focus:outline-none cursor-pointer'>
                <Image
                  src='/icons/hamburger.svg'
                  alt='Menu'
                  width={24}
                  height={24}
                />
              </button>
              {navOpen && (
                <div
                  ref={navRef}
                  className='absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl p-2 flex flex-col gap-2 z-30'>
                  {(isSignupPage || isHomePage) && (
                    <BorderButton
                      href={isAuthenticated ? "/create" : "/login"}
                      text='Log in'
                      classes='w-full text-center py-2 text-sm'
                      action={() => setNavOpen(false)}
                    />
                  )}
                  {(isLoginPage || isHomePage) && (
                    <AccentButton
                      href={isAuthenticated ? "/create" : "/signup"}
                      text='Create Snapshot'
                      classes='w-full text-center py-2 text-xs'
                      action={() => setNavOpen(false)}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Desktop Buttons - only on public pages */}
          {!isPrivatePage && (
            <div className='hidden md:flex items-center gap-5'>
              {(isSignupPage || isHomePage) && (
                <BorderButton
                  href={isAuthenticated ? "/create" : "/login"}
                  text='Log in'
                  classes='px-6 py-2 text-base'
                />
              )}
              {(isLoginPage || isHomePage) && (
                <AccentButton
                  href={isAuthenticated ? "/create" : "/signup"}
                  text='Create my Skill snapshot'
                  classes='px-6 py-2 text-base'
                />
              )}
            </div>
          )}

          {/* Profile and Logout icons - only on private pages when logged in */}
          {isPrivatePage && isAuthenticated && (
            <div className='ml-2 flex items-center gap-2'>
              <button
                onClick={() => router.push("/profile")}
                aria-label='Open profile'
                title='Profile'
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  pathname === "/profile"
                    ? "border-purple-700 bg-purple-700 text-white shadow-md shadow-purple-200"
                    : "border-purple-200 bg-white text-purple-700 hover:bg-purple-700 hover:text-white hover:border-purple-700"
                }`}>
                <FiUser className='w-4 h-4 md:w-5 md:h-5' />
              </button>
              <button
                onClick={handleSignOut}
                aria-label='Log out'
                title='Log out'
                className='w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 border-red-200 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600'>
                <FiLogOut className='w-4 h-4 md:w-5 md:h-5' />
              </button>
            </div>
          )}
          </div>
        </div>
      </header>
      <style jsx>{`
        /* (logout overlay removed) */
      `}</style>
    </>
  );
};

export default Header;
