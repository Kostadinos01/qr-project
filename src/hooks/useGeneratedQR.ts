import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";
import { storage } from "../firebase/firebase";
import QRCode from "qrcode";


export const useGeneratedQR = () => {
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClearAllBtnClick = () => {
    setQrCodes([]);
    setUploadedImageUrls([]);
  }

  const handleAddImgClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const generateQRCodes = async (imageUrls: string[]) => {
    if (imageUrls.length === 0) {
      console.error("No images to generate QR codes for");
      return;
    }

    try {
      const generatedQRCodes: string[] = [];

      for (const imageUrl of imageUrls) {
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const selectedFiles = e.target.files;

    if (selectedFiles) {
      try {
        setLoading(true);

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const imageRef = ref(storage, `images/${file.name}`);

          await uploadBytes(imageRef, file);

          const imageUrl = await getDownloadURL(imageRef);

          uploadedImageUrls.push(imageUrl);
        }

        setUploadedImageUrls(uploadedImageUrls);
        setLoading(false);

        await generateQRCodes(uploadedImageUrls);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return {
    generateQRCodes,
    handleAddImgClick,
    handleClearAllBtnClick,
    handleImageChange,
    inputFileRef,
    qrCodes,
    loading,
    uploadedImageUrls,
    setUploadedImageUrls,
  }
}