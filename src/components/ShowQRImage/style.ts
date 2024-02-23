import {
  Button,
  Grid,
  styled
} from '@mui/material'

const AddImgBtn = styled(Button)({
  color: "white",
  backgroundColor: "#f16e30",
  fontWeight: "800",
  borderRadius: "5px",

  "&:hover": {
    backgroundColor: "#e44f25",
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
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  padding: 20,
});

const QRCodeImage = styled('img')({
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
  AddImgBtn,
  ImageUploadBtn,
  QRContainer,
  QRCodeImage,
  DownloadLink,
}