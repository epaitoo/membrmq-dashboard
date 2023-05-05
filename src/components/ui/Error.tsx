import React, { useState } from 'react';

type ErrorProps = {
  message: string;
  onClose: () => void;
}

export default function ErrorComponent({ message,  onClose }: ErrorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [key, setKey] = useState(Math.random().toString(36).substring(7));

  const handleDismiss = () => {
    setIsVisible(false);
    setKey(Math.random().toString(36).substring(7));
    onClose(); 
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div key={key} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-red-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold">{message}</p>
        </div>
        <div className="ml-auto pl-4">
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
            onClick={handleDismiss}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 12.707a1 1 0 01-1.414 0L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10l-1.293-1.293a1 1 0 011.414-1.414L10 8.586l1.293-1.293a1 1 0 011.414 1.414L11.414 10l1.293 1.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}