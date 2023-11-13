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

const MainContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '100vh',
  height: 'auto',
});

const ProfilesContainer = styled(Grid)({
  backgroundColor: primary.light,
});

const Container = styled(Grid)({
  backgroundColor: warning.dark,
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  border: `3px solid ${warning.dark}`,
  borderRadius: "15px",
  padding: "10px 20px",
  zIndex: 1,
  width: "50%",
  flexDirection: "column",
  position: 'sticky',
  overflowY: 'scroll',
  top: '1%',
  left: '15%',
});

const ImagePreview = styled("img")({
  maxWidth: "250px",
  maxHeight: "250px",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
  marginTop: "50px",
  marginBottom: "50px",
});

const ExtraFieldsBtn = styled(Button)({
  color: warning.main,
  backgroundColor: primary.main,
  fontWeight: "900",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  marginTop: "30px",
  marginBottom: "50px",

  "&:hover": {
    backgroundColor: primary.dark,
  },
});

const AddImgBtn = styled(Button)({
  color: warning.main,
  backgroundColor: primary.main,
  fontWeight: "900",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",

  "&:hover": {
    backgroundColor: primary.dark,
  },
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

  "&:hover": {
    backgroundColor: primary.dark,
  },
});

const ImageUploadBtn = styled(Button)({
  backgroundColor: "#f16e30",
  color: "white",
  fontWeight: "800",
  borderRadius: "20px",
  margin: "20px 0",
  textAlign: "center",
  fontSize: "14px",

  '&:hover': {
    backgroundColor: "#e44f25",
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
  MainContainer,
  ProfilesContainer,
  Container,
  ImagePreview,
  ExtraFieldsBtn,
  AddImgBtn,
  Btn,
  ImageUploadBtn,
  CancelBtn,
}