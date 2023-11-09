import {
  styled,
  Box,
  Card,
} from '@mui/material'

import { theme } from "../../theme/pallete";

const {
  secondary,
  warning,
} = theme.palette;


const MainContainer = styled(Box)({
  display: 'flex',
  width: '85%',
  gap: '30px',
  zIndex: 1,
  position: 'relative',
  margin: 'auto',
  overflowY: 'scroll',
  marginTop: '30px',
});

const CustomCard = styled(Card)({
  color: warning.main,
  backgroundColor: secondary.main,
  border: `1px solid ${secondary.main}`,
  borderRadius: '20px',
  padding: '10px',
  width: '250px',
  height: '280px',
  margin: 'auto',
});

const ImagePreview = styled("img")({
  maxWidth: "210px",
  maxHeight: "210px",
  margin: "20px auto",
  borderRadius: "5px",
});

const QRCodeImage = styled('img')({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
});

export {
  MainContainer,
  CustomCard,
  ImagePreview,
  QRCodeImage,
}