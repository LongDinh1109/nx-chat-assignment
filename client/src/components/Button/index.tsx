import React from 'react';
type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'button';
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({children, onClick, type = 'button',className, ...props}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-700 focus:outline-none duration-300 ease-in ${className ?? ''}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
