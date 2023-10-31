import React from 'react';

import { LogoutBtn } from './style';

import { useAuth } from '../../hooks/useAuth';

import { TbLogout } from 'react-icons/tb'

const Logout = () => {
  const { signOut } = useAuth();

  return (
    <LogoutBtn
      className="muted-button"
      onClick={signOut}
    >
      <TbLogout />
    </LogoutBtn>
  );
};

export default Logout;