import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumberThunk,
  orderSelector,
  isLoadingOrderSelector
} from '../../services/slices/feed/slice';
import { ingredientsSelector } from '../../services/slices/ingredients/slice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC<{ isModal?: boolean }> = ({ isModal = false }) => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);
  const orderData = useSelector(orderSelector);
  const isLoading = useSelector(isLoadingOrderSelector);
  const { number } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderByNumberThunk(Number(number)));
  }, [number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} isModal={isModal} />;
};
