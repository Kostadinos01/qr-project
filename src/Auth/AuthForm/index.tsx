import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import {
  Background,
  FormContainer,
  FormImg,
  FormTitle,
  FormTextField,
  FormBtn,
} from './style';
import { LOGO_PATH, WALLPAPER_PATH } from '../../constants/Common';
import { AuthProps } from '../../types/Common';

export default function AuthForm({
  formTitle,
  email,
  password,
  btnName,
  btnValue,
  btnTitle,
  handleEmailChange,
  handlePasswordChange,
  handleClick,
  btnNavTitle,
}: AuthProps) {
  return (
    <Container component="main" maxWidth="xs">
      <Background src={WALLPAPER_PATH} alt='background wallpaper' />
      <CssBaseline />
      <FormContainer
        sx={{
          marginTop: { xs: "20px", md: "200px" },
          marginBottom: { xs: "20px", md: "200px" }
        }}
      >
        <FormImg src={LOGO_PATH} alt='DataScouting Logo' />
        <FormTitle>
          {formTitle}
        </FormTitle>
        <Box sx={{ mt: 1 }}>
          <FormTextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoFocus
            aria-required
            variant='standard'
          />
          <FormTextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={password}
            aria-required
            variant='standard'
          />
          <FormBtn
            type="submit"
            value={btnValue}
            name={btnName}
            onClick={handleClick}
            sx={{ mt: 3, mb: 2 }}
          >
            {btnTitle}
          </FormBtn>
        </Box>
      </FormContainer>
    </Container>
  );
}