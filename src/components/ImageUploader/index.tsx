import React, { useRef, useState } from "react";
import QRCode from "qrcode";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Paragraph,
  Container,
  Title,
  Subtitle,
  AddImgBtn,
  ImageUploadBtn,
  QRGeneratorBtn,
  QRCodeImage,
  DownloadLink,
  QRContainer,
} from "./style";
import Logout from "../Logout";
import { storage } from "../../firebase/firebase";

const ImageUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [successUploading, setSuccessUploading] = useState<boolean>(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleAddImgClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const uploadImagesToFirebase = async () => {
    if (!selectedFiles) {
      console.error("No files selected");
      return;
    }

    try {
      const uploadedImageUrls: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imageRef = ref(storage, `images/${file.name}`);

        await uploadBytes(imageRef, file);

        const imageUrl = await getDownloadURL(imageRef);

        uploadedImageUrls.push(imageUrl);
      }

      setUploadedImageUrls(uploadedImageUrls);
      setSuccessUploading(true);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const generateQRCodes = async () => {
    if (uploadedImageUrls.length === 0) {
      console.error("No images to generate QR codes for");
      return;
    }

    try {
      const generatedQRCodes: string[] = [];

      for (const imageUrl of uploadedImageUrls) {
        const qrCode = await QRCode.toDataURL(imageUrl, {
          width: 800,
          margin: 2,
          color: {
            dark: "#000",
            light: "#EEEEEEFF",
          },
        });

        generatedQRCodes.push(qrCode);
      }

      setQrCodes(generatedQRCodes);
    } catch (error) {
      console.error("Error generating QR codes:", error);
    }
  };

  return (
    <>
      <Logout />
      <Container>
        <Title>Select images and generate QR codes</Title>
        <Subtitle>
          Please select images, upload them, and generate QR codes. You can also download the generated QR codes.
        </Subtitle>
        <AddImgBtn onClick={handleAddImgClick}>Add Image</AddImgBtn>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <ImageUploadBtn variant="contained" onClick={uploadImagesToFirebase}>
          Upload Images to Firebase
        </ImageUploadBtn>
        {successUploading && (
          <Paragraph>Your uploading was successful!!</Paragraph>
        )}
        <QRGeneratorBtn variant="contained" onClick={generateQRCodes}>
          Generate QR Codes
        </QRGeneratorBtn>
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
              Download QR Code {index}
            </DownloadLink>
          </QRContainer>
        ))}
      </Container>
    </>
  );
};

export default ImageUpload;
