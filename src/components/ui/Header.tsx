import React from 'react';

interface HeaderProps {
  pageTitle: string;
  userName: string;
  onClick: () => void;
  buttonName: string;
}

const Header = ({pageTitle, userName, onClick, buttonName}:  HeaderProps) => {
  return (
    <div className='flex justify-between px-4 pt-4'>
      <h2>{pageTitle}</h2>
      <div className='flex items-center'>
        <h2 className='hidden md:block mr-4'>{userName}</h2>
        <button onClick={onClick} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default Header;