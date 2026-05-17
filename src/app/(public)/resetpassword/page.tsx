"use client";

import { AccentButton } from "@/components/CustomButton";
import React from "react";
import { TextField } from "@/components/TextField";
import { LeftBanner } from "@/components/LeftBanner";
import { BackButton } from "@/components/BackButton";
import { SocialSignIn } from "@/components/SocialSignIn";

const Login = () => {
  return (
    <main className='gradient-bg'>
      <div className='min-h-screen container flex flex-col md:flex-row items-center h-full'>
        <LeftBanner />

        <div className='md:w-1/2 flex items-center justify-center p-10'>
          <div className='w-full max-w-md space-y-5'>
            <BackButton to='/login' />

            <h2 className='text-3xl font-semibold text-title-black'>
              Reset Password
            </h2>

            <form className='space-y-4 mt-10'>
              <TextField
                value=''
                onChange={() => {}}
                type='password'
                label='New password'
                isRequired={true}
              />
              <TextField
                value=''
                onChange={() => {}}
                type='password'
                label='Confirm password'
                isRequired={true}
              />

              <AccentButton href='/create' text='Login' classes={"text-lg"} />
            </form>

            <div className='flex items-center my-4'>
              <hr className='flex-grow border-t border-light-grey/30' />
              <span className='mx-2 text-grey'>Or Login with</span>
              <hr className='flex-grow border-t border-light-grey/30' />
            </div>

            <SocialSignIn />

            <p className='text-center text-grey mt-4 cursor-pointer'>
              Don&apos;t have an account?{" "}
              <a href='/signup' className='text-purple font-semibold'>
                Sign-up
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
