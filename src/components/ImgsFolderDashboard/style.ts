import {
  styled,
  Grid,
  Button,
  Box,
  Fab,
} from '@mui/material';
import { theme } from '../../theme/pallete';

const {
  primary,
  secondary,
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

const BtnContainer = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  position: 'relative',
  margin: '0 100px',
  gap: '120px',
});

const FiltersBtnContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "start",
  marginTop: "80px",
  padding: "20px",
});

const AddProfileBtnContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "end",
  marginTop: "80px",
  padding: "20px",
});

const AddProfileBtn = styled(Fab)({
  color: warning.main,
  backgroundColor: secondary.main,
  fontWeight: "900",
  borderRadius: "80px",
  textAlign: "center",
  fontSize: "30px",
  minWidth: "55px",
  height: "55px",

  "&:hover": {
    backgroundColor: secondary.dark,
  },
});

const ProfilesContainer = styled(Grid)({
  backgroundColor: primary.light,
});

const Container = styled(Grid)({
  backgroundColor: warning.dark,
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  height: "auto",
  marginTop: "2%",
  border: `3px solid ${warning.dark}`,
  borderRadius: "15px",
  padding: "10px 20px",
  zIndex: 1,
  position: "relative",
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
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "14px",

  "&:hover": {
    backgroundColor: primary.dark,
  },
});

const CancelBtn = styled(Button)({
  color: warning.main,
  backgroundColor: error.main,
  fontWeight: "900",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "14px",

  "&:hover": {
    backgroundColor: error.dark,
  },
});

export {
  MainContainer,
  BtnContainer,
  FiltersBtnContainer,
  AddProfileBtnContainer,
  AddProfileBtn,
  ProfilesContainer,
  Container,
  ImagePreview,
  ExtraFieldsBtn,
  AddImgBtn,
  Btn,
  CancelBtn,
}