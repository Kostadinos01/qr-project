import React, { useContext } from "react";


import { useLocation, Navigate } from "react-router-dom";
import { PATHS } from "../../constants/Common";
import { AuthContext } from "../../context/AuthContext";
import { ChildrenPropTypes } from "../../types/Common";

export function GuestGuard(props: ChildrenPropTypes) {
  const { children } = props;

  const location = useLocation();

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Navigate to={PATHS.root} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
