import React, { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";

import {
  Paragraph,
  Container,
  Title,
  Subtitle,
  ImageInput,
  ImageUploadBtn,
  QRGeneratorBtn,
  QRCodeImage,
  DownloadLink,
  QRContainer,
} from "./style";
import Logout from "../Logout";

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [qr, setQr] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [successUploading, setSuccessUploading] = useState<boolean>(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const uploadImageToServer = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post("http://localhost:5000/upload", formData);

      setImageUrl(response.data.imageUrl);

      setSuccessUploading(true);

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const generateQRCode = async () => {
    try {
      QRCode.toDataURL(imageUrl, {
        width: 800,
        margin: 2,
        color: {
          dark: "#000",
          light: "#EEEEEEFF",
        },
      }).then((img: string) => setQr(img));
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <>
      <Logout />
      <Container>
        <Title>Select an image and generate a QR code</Title>
        <Subtitle>Please first select an image then press the upload button and last press the generate button. Also, you have the option to download the qr code that you have generated.</Subtitle>
        <ImageInput
          type="file"
          placeholder="Select your image"
          onChange={handleImageChange}
        />
        <ImageUploadBtn variant="contained" onClick={uploadImageToServer}>
          Upload Image
        </ImageUploadBtn>
        {successUploading && (
          <Paragraph>Your uploading was successfull!!</Paragraph>
        )}
        <QRGeneratorBtn variant="contained" onClick={generateQRCode}>
          Generate QR Code
        </QRGeneratorBtn>
        {qr && (
          <QRContainer>
            <QRCodeImage
              src={qr}
              alt="Hello"
              sx={{
                width: { xs: "250px", md: "500px" },
                height: { xs: "250px", md: "500px" },
              }}
            />
            <DownloadLink href={qr} download="qrcode.png">
              Download
            </DownloadLink>
          </QRContainer>
        )}
      </Container>
    </>
  );
};

export default ImageUpload;
