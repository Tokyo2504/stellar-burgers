import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredientsThunk } from '../../services/slices/ingredients/slice';
import { fetchUserThunk } from '../../services/slices/user/slice';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { ProtectedRoute } from '../protected-route';
import { isLoadingOrderSelector } from '../../services/slices/feed/slice';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const match = location.pathname.match(/\d+/);
  const orderNumber = match ? `#${match[0].padStart(6, '0')}` : null;
  const isLoadingOrder = useSelector(isLoadingOrderSelector);

  useEffect(() => {
    dispatch(fetchUserThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={isLoadingOrder ? 'Загрузка...' : String(orderNumber)}
                titleClassName={
                  !isLoadingOrder ? 'text text_type_digits-default' : ''
                }
                onClose={() => navigate(-1)}
              >
                <OrderInfo isModal />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={isLoadingOrder ? 'Загрузка...' : String(orderNumber)}
                titleClassName={
                  !isLoadingOrder ? 'text text_type_digits-default' : ''
                }
                onClose={() => navigate(-1)}
              >
                <OrderInfo isModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
