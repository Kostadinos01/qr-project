import React, {
  startTransition,
  createContext,
  useState,
  useEffect,
} from "react";

import Swal from 'sweetalert2';

import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../firebase/firebase";
import { PATHS } from '../constants/Common';
import { ChildrenPropTypes } from "../types/Common";

export const QRContext = createContext({
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => { },
  signOut: () => { },
});

export const AuthProvider = ({ children }: ChildrenPropTypes) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user)
      }
    });
    return unsubscribe
  }, [setCurrentUser]);

  // As soon as setting the current user to null, 
  // the user will be redirected to the home page. 
  const signOut = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1000,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            SignOutUser()
            setCurrentUser(null)
            startTransition(() => navigate(PATHS.login))
          },
        });
      }
    });
  }

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  }

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>;
}
