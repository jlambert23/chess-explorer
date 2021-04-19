import { HTMLAttributes, FunctionComponent } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  ...attributes
}) => (
  <div
    {...attributes}
    className={`bg-primary border-2 border-gray-300 rounded overflow-hidden p-2 ${className}`}
  >
    {children}
  </div>
);
