import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type SelectProps = {
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...buttonAttributes
}) => (
  <button
    {...buttonAttributes}
    className={`border-2 rounded p-2 focus:outline-none focus:border-gray-400 ${className}`}
  >
    {children}
  </button>
);

export const Select: React.FunctionComponent<SelectProps> = ({
  children,
  label,
  ...selectAttributes
}) => (
  <div className='flex w-full'>
    {label ? <label className='font-bold'>{label}</label> : ''}
    <select {...selectAttributes} className='rounded border mx-2 w-full pl-0.5'>
      {children}
    </select>
  </div>
);

export const Card: React.FunctionComponent = ({ children }) => (
  <div className='bg-white rounded overflow-hidden p-2'>{children}</div>
);
