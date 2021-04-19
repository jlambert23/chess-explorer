import { HTMLAttributes, FunctionComponent } from 'react';

export type LabelProps = HTMLAttributes<HTMLSpanElement>;

export const Label: FunctionComponent<LabelProps> = ({
  children,
  className,
}) => <span className={`font-medium pr-2 ${className}`}>{children}</span>;
