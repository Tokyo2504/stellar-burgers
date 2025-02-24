import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import {
  isAuthCheckedSelector,
  isAuthSelector
} from '../../services/slices/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const isAuth = useSelector(isAuthSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate replace to={location.state?.from || '/'} />;
  }

  return children;
};
