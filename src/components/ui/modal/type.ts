import { ReactNode } from 'react';

export type TModalUIProps = {
  title: string;
  titleClassName?: string;
  onClose: () => void;
  children?: ReactNode;
};
