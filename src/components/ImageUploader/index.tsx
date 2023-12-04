import React from "react";
import {
  Paragraph,
  Container,
  Title,
  Subtitle,
  AddImgBtn,
  QRCodeImage,
  DownloadLink,
  QRContainer,
  ClearAllBtn,
} from "./style";
import Logout from "../Logout";
import LoadingSpinner from "../LoadingSpinner";
import { Grid } from "@mui/material";
import { useGeneratedQR } from "../../hooks/useGeneratedQR";

const ImageUpload: React.FC = () => {
  const {
    handleAddImgClick,
    handleClearAllBtnClick,
    handleImageChange,
    inputFileRef,
    qrCodes,
    successUploading,
    loading,
  } = useGeneratedQR();

  return (
    <>
      <Logout />
      <Container>
        <Title>Select images and generate QR codes</Title>
        <Subtitle>
          Please select images, upload them, and generate QR codes. You can also download the generated QR codes.
        </Subtitle>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <AddImgBtn onClick={handleAddImgClick}>Add Image</AddImgBtn>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <ClearAllBtn
            onClick={handleClearAllBtnClick}
          >
            CLEAR ALL
          </ClearAllBtn>
        </Grid>
        {successUploading && (
          <Paragraph>Your uploading was successful!!</Paragraph>
        )}
        {loading && (
          <LoadingSpinner />
        )}
        {qrCodes.map((qr, index) => (
          <QRContainer key={index}>
            <QRCodeImage
              src={qr}
              alt={`QR Code ${index}`}
              sx={{
                width: { xs: "250px", md: "500px" },
                height: { xs: "250px", md: "500px" },
              }}
            />
            <DownloadLink href={qr} download={`qrcode_${index}.png`}>
              Download QR
            </DownloadLink>
          </QRContainer>
        ))}
      </Container>
    </>
  );
};

export default ImageUpload;
