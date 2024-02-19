import {
  styled,
  Grid,
  Button,
} from '@mui/material';
import { theme } from '../../theme/pallete';

const {
  primary,
  warning,
  error,
} = theme.palette;

const ProfilesContainer = styled(Grid)({
  backgroundColor: primary.light,
});

const Container = styled(Grid)({
  backgroundColor: warning.dark,
  display: 'flex',
  justifyContent: 'center',
  maxHeight: '90vh',
  border: `3px solid ${warning.dark}`,
  borderRadius: "15px",
  padding: "10px 15px",
  zIndex: 1,
  width: "50%",
  flexDirection: "column",
  overflowY: 'scroll',
  margin: "auto",
  marginTop: "50px",
});

const ImagePreview = styled("img")({
  maxWidth: "250px",
  maxHeight: "250px",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
  marginTop: "20px",
  marginBottom: "20px",
});

const Btn = styled(Button)({
  color: warning.main,
  backgroundColor: primary.main,
  fontWeight: "900",
  borderRadius: "25px",
  textAlign: "center",
  fontSize: "14px",
  margin: "auto",
  display: "flex",
  marginTop: "30px",

  "&:hover": {
    backgroundColor: primary.dark,
  },
});

const CancelBtn = styled(Button)({
  color: warning.main,
  backgroundColor: error.main,
  fontWeight: "800",
  borderRadius: "20px",
  textAlign: "center",
  fontSize: "14px",
  margin: "20px 0",

  "&:hover": {
    backgroundColor: error.dark,
  },
});

export {
  ProfilesContainer,
  Container,
  ImagePreview,
  Btn,
  CancelBtn,
}