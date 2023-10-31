import React, { startTransition } from 'react';
import {
  Button, Container, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from './style';
import { ERROR } from '../../../constants/common/Assets';

export default function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    startTransition(() => navigate("/login"));
  };

  return (
    <Container maxWidth="md">
      <MainContainer container sx={{ flexDirection: { xs: "column", md: "row" } }} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            The page you’re looking for doesn’t exist.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClick}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img
            src={ERROR}
            alt="Error Page 404"
            width={500}
          />
        </Grid>
      </MainContainer>
    </Container>
  );
}
