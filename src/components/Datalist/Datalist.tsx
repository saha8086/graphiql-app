import type { FC, useId } from 'react';

export type Option = string | number;

export interface DatalistProps {
  id: ReturnType<typeof useId>;
  options: Option[];
}

export const Datalist: FC<DatalistProps> = ({ id, options }) => (
  <datalist id={id}>
    {options.map((option) => (
      <option key={option} value={option} />
    ))}
  </datalist>
);
