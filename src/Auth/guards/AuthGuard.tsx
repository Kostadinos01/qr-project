import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/Common';
import { AuthContext } from '../../context/AuthContext';
import { ChildrenPropTypes } from "../../types/Common";

export default function AuthGuard(props: ChildrenPropTypes) {
  const { children } = props;
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const navigateToUnauthorized = useCallback(() => {
    navigate(PATHS.root, { state: { from: location }, replace: true });
  }, [navigate, location]);

  useEffect(() => {
    if (!currentUser) {
      navigateToUnauthorized();
    }
  });

  return <>{children}</>;
}
