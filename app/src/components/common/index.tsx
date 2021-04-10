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
    className={`rounded p-2 focus:outline-none ${className}`}
    {...buttonAttributes}
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
    <select className='rounded border mx-2 w-full pl-0.5' {...selectAttributes}>
      {children}
    </select>
  </div>
);

export const Card: React.FunctionComponent = ({ children }) => (
  <div className='bg-white rounded overflow-hidden p-2'>{children}</div>
);
