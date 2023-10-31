import {
  Grid,
  styled,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { theme } from "../../theme/pallete";

const {
  secondary,
  warning,
} = theme.palette;

const Background = styled("img")({
  width: "100%",
  height: "100%",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'transparent',
});

const FormContainer = styled(Grid)({
  border: `1px solid ${secondary.dark}`,
  backgroundColor: secondary.dark,
  borderRadius: '15px',
  marginTop: '200px',
  marginBottom: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
});

const FormImg = styled("img")({
  marginTop: '10px',
});

const FormTitle = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  marginTop: '20px',
  color: warning.light,
  fontSize: '24px',
  fontWeight: '900',
});

const FormTextField = styled(TextField)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  marginBottom: '15px',
  color: warning.light,
});

const FormBtn = styled(Button)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  marginBottom: '15px',
  color: warning.light,
  border: `1px solid ${secondary.main}`,
  borderRadius: '20px',
  backgroundColor: secondary.main,
  padding: '5px',
  fontSize: '14px',
  fontWeight: '800',
  width: '120px',

  "&:hover": {
    border: `1px solid ${secondary.dark}`,
    backgroundColor: secondary.dark,
  }
});

const SwitchToContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  flexDirection: 'column',
});

const SwitchToBtn = styled(Button)({
  background: 'none',
  border: 'none',
  style: 'none',
  fontSize: '16px',
  color: warning.light,

  "&:hover": {
    background: 'none',
    border: 'none',
  }
});

export {
  Background,
  FormContainer,
  FormImg,
  FormTitle,
  FormTextField,
  FormBtn,
  SwitchToContainer,
  SwitchToBtn,
}