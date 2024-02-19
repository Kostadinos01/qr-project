import {
  styled,
  Button,
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

export {
  LogoutBtn,
  Container,
  Title,
  Subtitle,
}