import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { nameSelector } from '../../services/slices/user/slice';

export const AppHeader: FC = () => {
  const user = useSelector(nameSelector);
  return <AppHeaderUI userName={user} />;
};
