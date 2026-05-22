"use client";

import ProfileProgressRing from "@/components/ProfileProgressRing";
import { TextField } from "@/components/TextField";
import { useEditProfileMutation } from "@/hooks/auth/editProfileHook";
import { useProfile } from "@/hooks/auth/profileHook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiArrowLeft } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: profileData } = useProfile();
  const editProfileMutation = useEditProfileMutation();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!profileData?.profile) return;
    const { first_name, last_name, email } = profileData.profile;
    if (first_name) setFirstName(first_name);
    if (last_name) setLastName(last_name);
    if (email) setEmail(email);
  }, [profileData]);

  const profile = profileData?.profile;
  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    profile?.username ||
    "";
  const displayEmail = profile?.email || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setError("Enter your current password to set a new one.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
      }
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      ...(currentPassword
        ? { current_password: currentPassword, new_password: newPassword }
        : {}),
    };

    editProfileMutation.mutate(payload, {
      onSuccess: (data) => {
        setSuccessMsg(data.message || "Profile updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (err) => {
        const axiosErr = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosErr.response?.data?.message ||
            err.message ||
            "Failed to update profile."
        );
      },
    });
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/create");
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setAvatarUrl(URL.createObjectURL(file));
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
        </button>

        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-zinc-200'>
          <div className='md:border-r border-zinc-200 pr-0 md:pr-4'>
            <div className='flex md:flex-row flex-col items-center gap-3'>
              <ProfileProgressRing
                imageUrl={avatarUrl}
                name={displayName}
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
              {displayName}
            </h2>
            <span className='text-xs md:text-sm text-gray-500 bg-violet-50/50 px-4 md:px-6 py-1 rounded-full inline-block mt-1'>
              {displayEmail}
            </span>
          </div>
        </div>

        <form className='mt-8 space-y-4' onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 gap-4'>
            <TextField
              type='text'
              label='First Name'
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
            label='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            classes='!bg-gray-50 !shadow-none'
          />
          <TextField
            type='password'
            label='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            classes='!bg-gray-50 !shadow-none'
          />
          <TextField
            type='password'
            label='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classes='!bg-gray-50 !shadow-none'
          />

          {error && <p className='text-red-600 text-sm'>{error}</p>}
          {successMsg && <p className='text-green-600 text-sm'>{successMsg}</p>}

          <div className='flex justify-end mt-8 w-full'>
            <button
              type='submit'
              disabled={editProfileMutation.isPending}
              className='bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white px-6 py-2 rounded-lg shadow-sm transition cursor-pointer'>
              {editProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
