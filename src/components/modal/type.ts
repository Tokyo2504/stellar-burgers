import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  titleClassName?: string;
  onClose: () => void;
  children?: ReactNode;
};
