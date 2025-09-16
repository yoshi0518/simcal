export type propsType = {
  value: string;
  type: 'number' | 'operator' | 'function' | 'equals';
  span?: 'col-span-2' | 'row-span-2';
  icon?: React.ReactNode;
  ariaLabel?: string;
  onClick: () => void;
};
