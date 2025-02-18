import React from 'react';
type InputProps = {
  value?: string | number;
  onChange: (e: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
};
export default function Input({
  value,
  onChange,
  placeholder,
  isRequired = false,
  type = 'text',
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        required={isRequired}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
