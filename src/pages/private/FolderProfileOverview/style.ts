import {
  Box,
  Grid,
  Typography,
  styled,
} from '@mui/material'

import { theme } from "../../theme/pallete";

const {
  secondary,
  warning,
} = theme.palette;


const Container = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  boxShadow: "24px",
  padding: '10px',
});

const OverviewContainer = styled(Grid)({
  backgroundColor: secondary.dark,
  border: `1px solid ${secondary.dark}`,
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '1200px',
  height: 'auto',
  flexDirection: 'column',
  padding: '10px',
  flexWrap: 'wrap',
});

const Title = styled(Typography)({
  color: warning.light,
  fontWeight: '900',
  fontSize: '25px',
  textAlign: 'center',
  marginTop: '20px',
  borderBottom: `2px solid ${warning.light}`,
});

const Subtitle = styled(Typography)({
  margin: 'auto',
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  color: warning.light,
  fontWeight: '800',
  fontSize: '20px',
  borderBottom: `1px solid ${warning.light}`,
  width: '250px',
});

const ImagePreview = styled("img")({
  maxWidth: "400px",
  maxHeight: "400px",
  justifyContent: "center",
  margin: "auto",
  display: "flex",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "20px",
});

const MainTypographyContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
});

const TypographyContainer = styled(Grid)({
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '50px',
});

const CustomTypography = styled(Typography)({
  padding: '5px',
  color: warning.light,
  fontSize: '18px',
  fontWeight: '400',
});

export {
  Container,
  OverviewContainer,
  Title,
  Subtitle,
  ImagePreview,
  MainTypographyContainer,
  TypographyContainer,
  CustomTypography,
}