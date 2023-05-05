import React from 'react';

interface LoadingButtonProps {
  isLoading: boolean;
  buttonText: string;
  loadingText: string;
}

export default function LoadingButton({
  isLoading,
  buttonText,
  loadingText,
}: LoadingButtonProps) {
  return (
    <button
      className='border-primary w-full cursor-pointer rounded-md border bg-blue-600 py-3 px-5 text-base text-white transition hover:bg-opacity-90'
      disabled={isLoading}
    >
      {isLoading ? loadingText : buttonText}
    </button>
  );
}
