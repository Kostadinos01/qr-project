import {
  styled,
  Button,
  Grid,
} from '@mui/material';

const LogoutBtn = styled(Button)({
  color: "white",
  backgroundColor: "#eb0c00",
  fontSize: "16px",
  fontWeight: "800",
  borderRadius: "30px",
  padding: '10px',

  '&:hover': {
    backgroundColor: "#a40800",
  },
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: "center",
});

const Title = styled("h1")({
  fontSize: "30px",
  fontWeight: "800",
  marginTop: "30px",
  marginBottom: "15px",
});

const Subtitle = styled("h3")({
  fontSize: "15px",
  fontWeight: "800",
  marginBottom: "50px",
});

const AddImgBtn = styled(Button)({
  color: "white",
  backgroundColor: "#f16e30",
  fontWeight: "800",
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: "#e44f25",
  },
});

const ClearAllBtn = styled(Button)({
  color: "white",
  backgroundColor: "#009999",
  fontWeight: "800",
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: "#004d4d",
  },
});

const ImageUploadBtn = styled(Button)({
  backgroundColor: "#f16e30",
  color: "white",
  fontWeight: "800",
  borderRadius: "20px",
  margin: "20px 0",

  '&:hover': {
    backgroundColor: "#e44f25",
  },
});

const QRContainer = styled(Grid)({
  marginTop: "30px",
});

const QRCodeImage = styled('img')({
  marginTop: '10px',
});

const DownloadLink = styled('a')({
  color: "#009999",
  fontWeight: "800",
  fontSize: "24px",
  display: 'flex',
  justifyContent: "center",
  margin: '25px 0',
});

export {
  LogoutBtn,
  Container,
  Title,
  Subtitle,
  AddImgBtn,
  ClearAllBtn,
  ImageUploadBtn,
  QRContainer,
  QRCodeImage,
  DownloadLink,
}