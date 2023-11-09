import {
  styled,
  Button,
  Box,
} from '@mui/material';

const Container = styled(Box)({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  backgroundColor: '#009999',
  border: '2px solid #009999',
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const AddFolderBtn = styled(Button)({
  color: "white",
  backgroundColor: "#009999",
  fontWeight: "800",
  borderRadius: "20px",
  marginTop: "30px",

  "&:hover": {
    backgroundColor: "#004d4d",
  },
});

const AddImgBtn = styled(Button)({
  color: "white",
  backgroundColor: "#004d4d",
  fontWeight: "800",
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: "#004d4d",
  },
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

const ImageUploadBtn = styled(Button)({
  backgroundColor: "#f16e30",
  color: "white",
  fontWeight: "800",
  borderRadius: "20px",
  marginTop: "50px",
  '&:hover': {
    backgroundColor: "#e44f25",
  },
});

export {
  Container,
  AddFolderBtn,
  AddImgBtn,
  ImagePreview,
  ImageUploadBtn,
}