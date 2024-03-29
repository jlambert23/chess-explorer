import { ButtonHTMLAttributes, FunctionComponent } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...buttonAttributes
}) => (
  <button
    {...buttonAttributes}
    className={`border-2 rounded p-2 filter disabled:pointer-events-none disabled:opacity-20 hover:brightness-90 focus:brightness-90 focus:outline-none ${className}`}
  >
    {children}
  </button>
);
