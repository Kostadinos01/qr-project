import React, {
  createContext,
  useState,
} from "react";
import QRCode from "qrcode";
import { ChildrenPropTypes } from "../types/Common";

export const QRContext = createContext<{
  generateQRCodes: (imageUrls: string[]) => void;
  uploadedImageUrls: string[];
  setUploadedImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  qrCodes: string[];
  setQrCodes: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  generateQRCodes: () => { },
  uploadedImageUrls: [],
  setUploadedImageUrls: () => { },
  qrCodes: [],
  setQrCodes: () => { },
});

export const QRProvider = ({ children }: ChildrenPropTypes) => {
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

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

  const value = {
    generateQRCodes,
    uploadedImageUrls,
    setUploadedImageUrls,
    qrCodes,
    setQrCodes,
  };

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>;
}