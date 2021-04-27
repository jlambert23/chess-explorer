import { FunctionComponent, useState } from 'react';

export type ToggleProps = {
  label: string;
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
};

export const Toggle: FunctionComponent<ToggleProps> = ({
  label,
  onChange = () => null,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    onChange(!checked);
    setChecked(!checked);
  };

  return (
    <div className='flex items-center'>
      <div className='flex items-center border-2 rounded p-2'>
        <input type='checkbox' onChange={toggle} checked={checked} />
        <label className='ml-2'>{label}</label>
      </div>
    </div>
  );
};
