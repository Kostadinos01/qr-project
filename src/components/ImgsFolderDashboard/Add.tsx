import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import QRCode from "qrcode";
import { Grid, Modal } from '@mui/material';
import {
  AddImgBtn,
  CancelBtn,
  Container,
  ImagePreview,
} from './style';
import { AddProfilePageProps } from './types';
import { storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageUploadBtn } from '../ImageUploader/style';
import CustomTextField from '../TextField';
import { AddFolderBtn } from '../Modal/style';

const Add = ({
  folderProfiles,
  setIsAdding,
}: AddProfilePageProps) => {
  const [folderName, setFolderName] = useState<string | undefined>("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleCancelClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsAdding(false);
  }

  const handleAddImgClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleAdd = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!folderName || !selectedFiles) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newProfile = {
      folderName,
      selectedFiles,
    };

    folderProfiles.push(newProfile);

    if (!selectedFiles) {
      console.error('No files selected');
      return;
    }

    try {
      const folderRef = ref(storage, `${folderName}/`);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imageRef = ref(folderRef, file.name);

        await uploadBytes(imageRef, file);

        const imageUrl = await getDownloadURL(imageRef);

        uploadedImageUrls.push(imageUrl);
      }

      setUploadedImageUrls(uploadedImageUrls);

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

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Data has been Added.`,
        showConfirmButton: false,
        timer: 1000,
      });

    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const folders = () => {
    return (
      <Container>
        <CustomTextField
          itemID="folder-name"
          itemLabel="Folder Name"
          value={folderName}
          handleChange={(e) => setFolderName(e.target.value)}
        />
        <AddImgBtn onClick={handleAddImgClick}>Add Images</AddImgBtn>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
          multiple
        />
        <Grid
          container
          display="flex"
          flexDirection="row"
          wrap="nowrap"
          gap={4}
          maxWidth="90%"
        >
          {selectedFiles &&
            Array.from(selectedFiles).map((file, index) => (
              <ImagePreview key={index} src={URL.createObjectURL(file)} alt={file.name} />
            ))
          }
        </Grid>
        <ImageUploadBtn variant="contained" onClick={handleAdd}>
          Add
        </ImageUploadBtn>
        <CancelBtn variant="contained" onClick={handleCancelClick}>
          Cancel
        </CancelBtn>
      </Container>
    )
  }


  return (
    <>
      <AddFolderBtn onClick={handleOpen}>Open modal</AddFolderBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {folders()}
      </Modal>
    </>
  );
};

export default Add;