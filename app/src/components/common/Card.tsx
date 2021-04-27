import { HTMLAttributes, FunctionComponent } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  ...attributes
}) => (
  <div
    {...attributes}
    className={`bg-2 text-2 border-2 rounded overflow-hidden p-2 ${className}`}
  >
    {children}
  </div>
);
