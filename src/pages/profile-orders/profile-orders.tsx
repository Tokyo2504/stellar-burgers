import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchOrderThunk,
  ordersSelector
} from '../../services/slices/user/slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
