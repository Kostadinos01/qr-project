import React, { startTransition } from "react";
import {
  Container,
  Title,
  Subtitle,
} from "./style";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/Common";
import ShowQRImage from "../ShowQRImage";

const ImageUpload: React.FC = () => {

  const navigate = useNavigate();

  const handleLoginNav = () => {
    startTransition(() => navigate(PATHS.login))
  }

  return (
    <>
      <Button onClick={handleLoginNav}>Login</Button>
      <Container>
        <Title>Select images and generate QR codes</Title>
        <Subtitle>
          Please select images, upload them, and generate QR codes. You can also download the generated QR codes.
        </Subtitle>
        <ShowQRImage description="" />
      </Container>
    </>
  );
};

export default ImageUpload;
