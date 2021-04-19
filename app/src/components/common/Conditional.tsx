import { Fragment, FunctionComponent, isValidElement } from 'react';

export const Conditional: FunctionComponent<{ condition: any }> = ({
  condition,
  children,
}) => {
  if (!children || !condition) {
    return null;
  }
  if (!isValidElement(children)) {
    return <Fragment>{children}</Fragment>;
  }
  return children;
};
