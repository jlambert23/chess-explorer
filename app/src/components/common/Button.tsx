import { ButtonHTMLAttributes, FunctionComponent } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = ({
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
