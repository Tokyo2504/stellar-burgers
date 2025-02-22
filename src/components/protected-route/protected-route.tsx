import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import {
  isAuthSelector,
  loginRequestSelector
} from '../../services/slices/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthCheked = useSelector(isAuthSelector);
  const loginRequest = useSelector(loginRequestSelector);

  if (!isAuthCheked && loginRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthCheked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthCheked) {
    const redirectPath = location.state?.from;
    return <Navigate replace to={redirectPath} state={location} />;
  }

  return children;
};
