"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BorderButton } from "@/components/CustomButton";

const FileUploader = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    noClick: true,
    noKeyboard: true,
  });

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl px-4 py-4 md:py-6 text-center transition-all
        ${isDragActive
          ? "border-purple bg-purple/5"
          : "border-light-grey/30 bg-white"
        }`}>
      <input {...getInputProps()} />

      {!file ? (
        <>
          <p className='text-xs md:text-sm text-grey'>
            <span
              onClick={open}
              className='text-indigo-700 font-semibold cursor-pointer hover:underline'>
              Click to upload  
            </span>
            or drag and drop
          </p>
          <p className='text-[10px] md:text-xs text-light-grey mt-1'>
            (pdf, doc, docx files only, max 5MB)
          </p>

          <div className='flex items-center my-2 md:my-4'>
            <hr className='flex-grow border-t border-light-grey/30' />
            <span className='mx-2 text-grey/50 font-semibold text-[10px] md:text-xs'>OR</span>
            <hr className='flex-grow border-t border-light-grey/30' />
          </div>

          <BorderButton
            href=''
            text='Browse files'
            classes='inline-block !text-xs md:!text-sm !py-1.5 md:!py-2'
            action={open}
          />
        </>
      ) : (
        <div className='flex items-center justify-between bg-light-grey/10 border border-light-grey/30 rounded-lg px-4 py-2'>
          <span className='text-sm text-gray-700 truncate'>{file.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering dropzone open
              clearFile();
            }}
            className='ml-3 text-gray-400 hover:text-red-500 transition cursor-pointer'>
            <Image src='/icons/trash.svg' alt='' width={20} height={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
