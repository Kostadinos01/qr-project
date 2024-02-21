import React, {
  createContext,
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

import QRCode from "qrcode";

import { db, storage } from "../firebase/firebase";
import { ChildrenPropTypes, FolderProfile } from "../types/Common";
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage, listAll } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

export const QRContext = createContext<{
  qrCodes: string[];
  setQrCodes: Dispatch<SetStateAction<string[]>>;
  uploadedImageUrls: string[];
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  inputFileRef: MutableRefObject<HTMLInputElement | null>;
  handleClearAllBtnClick: () => void;
  handleAddImgClick: (e: { preventDefault: () => void }) => void;
  generateQRCodes: (imageUrls: string[]) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}>({
  qrCodes: [],
  setQrCodes: () => [],
  uploadedImageUrls: [],
  setUploadedImageUrls: () => [],
  loading: false,
  setLoading: () => false,
  inputFileRef: { current: null },
  handleClearAllBtnClick: () => { },
  handleAddImgClick: (e: { preventDefault: () => void }) => { },
  generateQRCodes: (imageUrls: string[]) => { },
  handleImageChange: async (e: ChangeEvent<HTMLInputElement>) => { },
  handleDelete: async () => { },
});

export const QRProvider = ({ children }: ChildrenPropTypes) => {
  const [folderProfiles, setFolderProfiles] = useState<FolderProfile[]>([]);
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
        const uploadedImageUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const imageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(imageRef, file);
          const imageUrl = await getDownloadURL(imageRef);
          uploadedImageUrls.push(imageUrl);
        }

        setLoading(false);

        const folderProfilesCollectionRef = collection(db, "FolderProfiles");
        await addDoc(folderProfilesCollectionRef, {
          uploadedImageUrls: uploadedImageUrls,
        });

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `Data has been Added.`,
          showConfirmButton: false,
          timer: 1000,
        });

        await generateQRCodes(uploadedImageUrls);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        await deleteDoc(doc(db, 'FolderProfiles', id));

        const storage = getStorage();
        const folderRef = ref(storage, id);

        const items = await listAll(folderRef);

        items.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
        });

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Data and folder have been deleted.',
          showConfirmButton: false,
          timer: 1500,
        });

        const profilesCopy = folderProfiles.filter((profile) => profile.id !== id);
        setFolderProfiles(profilesCopy);
      }
    });
  };

  const value = {
    qrCodes,
    setQrCodes,
    uploadedImageUrls,
    setUploadedImageUrls,
    loading,
    setLoading,
    inputFileRef,
    handleClearAllBtnClick,
    handleAddImgClick,
    generateQRCodes,
    handleImageChange,
    handleDelete,
  }

  return <QRContext.Provider value={value}>{children}</QRContext.Provider>;
}
