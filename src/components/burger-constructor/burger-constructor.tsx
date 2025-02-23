import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerConstructorSelector,
  clearBurgerConstructor
} from '../../services/slices/burger-constructor/slice';
import {
  fetchOrderBurgerThunk,
  isLoadingOrderSelector,
  orderSelector,
  resetOrder
} from '../../services/slices/order/slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { isAuthSelector } from '../../services/slices/user/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(isLoadingOrderSelector);
  const orderModalData = useSelector(orderSelector);
  const isAuth = useSelector(isAuthSelector);

  const onOrderClick = () => {
    const { ingredients, bun } = constructorItems;
    const order: Array<string> = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];

    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(fetchOrderBurgerThunk(order));
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearBurgerConstructor());
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
