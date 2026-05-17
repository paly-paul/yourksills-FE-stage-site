"use client";

import ProfileProgressRing from "@/components/ProfileProgressRing";
import { TextField } from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiArrowLeft } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validation, setValidation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setValidation("success");
  }, []);

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/create");
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      console.log(previewUrl);
      setAvatarUrl(previewUrl);
    },
  });

  return (
    <div className='gradient-bg flex items-center justify-center p-16'>
      <div className='w-full max-w-4xl bg-white rounded-2xl tag-shadow p-8'>
        <button
          type='button'
          onClick={handleBack}
          className='mb-5 inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 transition-all duration-300 hover:border-purple-700 hover:bg-purple-700 hover:text-white cursor-pointer'>
          <FiArrowLeft className='h-4 w-4' />
          {/* Back */}
        </button>
        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-zinc-200'>
          <div className='md:border-r border-zinc-200 pr-0 md:pr-4'>
            <div className='flex md:flex-row flex-col items-center gap-3'>
              <ProfileProgressRing
                imageUrl={avatarUrl}
                name='Anita Shen'
                size={isMobile ? 100 : 160}
              />
              <div {...getRootProps()} className='relative overflow-visible'>
                <input {...getInputProps()} />
                <p
                  onClick={open}
                  className='cursor-pointer text-gray-400 hover:text-purple font-semibold text-sm md:text-base'>
                  Edit
                </p>
              </div>
            </div>
          </div>

          <div className='text-center md:text-left md:pl-4'>
            <h2 className='text-2xl md:text-4xl font-semibold gradient-text block'>
              Anita Shen
            </h2>
            <span className='text-xs md:text-sm text-gray-500 bg-violet-50/50 px-4 md:px-6 py-1 rounded-full inline-block mt-1'>
              anitashen@gmail.com
            </span>
          </div>
        </div>

        {/* Form */}
        <form className='mt-8 space-y-4' onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 gap-4'>
            <TextField
              type='text'
              label='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              isRequired={true}
              classes='!bg-gray-50 !shadow-none'
            />
            <TextField
              type='text'
              label='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              isRequired={true}
              classes='!bg-gray-50 !shadow-none'
            />
          </div>
          <TextField
            type='email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired={true}
            classes='!bg-gray-50 !shadow-none'
          />
          <TextField
            type='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired={true}
            classes='!bg-gray-50 !shadow-none'
          />
          <TextField
            type='password'
            label='Change Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isRequired={true}
            classes='!bg-gray-50 !shadow-none'
          />
          <TextField
            type='password'
            label='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isRequired={true}
            classes='!bg-gray-50 !shadow-none'
          />
          <p className='text-red-900 text-sm'>{validation}</p>
          <div className='flex justify-end mt-8 w-full '>
            <button className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-sm transition cursor-pointer'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
