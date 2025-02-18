import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  error: string | null;
}

const Form = ({
  children,
  onSubmit,
  className,
  header,
  footer,
  error,
}: FormProps) => {
  return (
    <div className='w-full space-y-8'>
      {header && <div className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{header}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className={`mt-8 space-y-6 ${className}`}
      >
        {children}
      </form>
      {error && <div>{error}</div>}
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default Form;