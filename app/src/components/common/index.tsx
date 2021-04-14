import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export type SelectProps = {
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export type LabelProps = React.HTMLAttributes<HTMLSpanElement>;

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

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  className,
  ...attributes
}) => (
  <div
    {...attributes}
    className={`bg-white border-2 border-gray-300 rounded overflow-hidden p-2 ${className}`}
  >
    {children}
  </div>
);

export const Conditional: React.FunctionComponent<{ condition: any }> = ({
  condition,
  children,
}) => {
  if (!children || !condition) {
    return null;
  }
  if (!React.isValidElement(children)) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return children;
};

export const Label: React.FunctionComponent<LabelProps> = ({
  children,
  className,
}) => <span className={`font-medium pr-2 ${className}`}>{children}</span>;

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
