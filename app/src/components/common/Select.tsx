import { SelectHTMLAttributes, FunctionComponent } from 'react';

export type SelectProps = {
  label?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select: FunctionComponent<SelectProps> = ({
  children,
  label,
  className,
  ...selectAttributes
}) => (
  <div className='flex w-full'>
    {label ? <label className='font-bold'>{label}</label> : ''}
    <select
      className={`bg-2 rounded border mx-2 w-full pl-0.5 ${className}`}
      {...selectAttributes}
    >
      {children}
    </select>
  </div>
);
