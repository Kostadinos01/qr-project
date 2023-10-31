import React, { startTransition, ChangeEvent, FormEvent, useState } from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom'

import { PATHS } from '../../constants/Common';
import AuthForm from '../../Auth/AuthForm';
import { signInUser } from '../../firebase/firebase';

const defaultFormFields = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const navigate = useNavigate();

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInUser(email, password)

      if (userCredential) {
        resetFormFields();

        Swal.fire({
          timer: 500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            startTransition(() => navigate(PATHS.root));

            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: false,
              timer: 1000,
            });
          },
        });
      }
    } catch (error) {
      Swal.fire({
        timer: 1000,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <AuthForm
      formTitle='Login'
      btnName='Login'
      btnValue='Login'
      btnTitle='Login'
      email={email}
      password={password}
      handleEmailChange={handleChange}
      handlePasswordChange={handleChange}
      handleClick={handleLogin}
      btnNavTitle="Register"
    />
  )
}

export default LoginPage