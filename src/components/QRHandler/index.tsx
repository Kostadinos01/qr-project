import React from "react";
import {
  Container,
  Title,
  Subtitle,
} from "./style";
import ShowQRImage from "../ShowQRImage";

const ImageUpload: React.FC = () => {

  return (
    <>
      <Container>
        <Title>Select images and generate QR codes</Title>
        <Subtitle>
          Please select images, upload them, and generate QR codes. You can also download the generated QR codes.
        </Subtitle>
        <ShowQRImage />
      </Container>
    </>
  );
};

export default ImageUpload;
