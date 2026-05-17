import React from "react";

interface PDFLoadingOverlayProps {
  isVisible: boolean;
}

const PDFLoadingOverlay = ({ isVisible }: PDFLoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85'>
      {/* Gradient AI loader */}
      <div className='relative w-28 h-28'>
        {/* Outer gradient ring */}
        <div
          className='absolute inset-0 rounded-full animate-spin'
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #8b5cf6 25%, #3b82f6 50%, #06b6d4 75%, transparent 100%)",
            maskImage:
              "radial-gradient(circle, transparent 68%, black 71%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 68%, black 71%, black 100%)",
          }}></div>
      </div>

      {/* Loading text */}
      <p className='text-center text-white mt-8 text-lg font-medium'>
        Generating your PDF...
      </p>
    </div>
  );
};

export default PDFLoadingOverlay;
