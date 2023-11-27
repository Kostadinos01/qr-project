import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Grid, Modal } from '@mui/material';
import {
  AddImgBtn,
  Btn,
  CancelBtn,
  Container,
  ImagePreview,
  ImageUploadBtn,
} from './style';
import { AddProfilePageProps } from './types';
import { db, storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomTextField from '../TextField';
import { addDoc, collection } from 'firebase/firestore';
import { useQR } from '../../hooks/useQR';

const Add = ({
  folderProfiles,
}: AddProfilePageProps) => {
  const [folderName, setFolderName] = useState<string | undefined>("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    uploadedImageUrls,
    setUploadedImageUrls,
    generateQRCodes,
  } = useQR();

  const handleOpen = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsAdding(true);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleCancelClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setSelectedFiles(null);
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

      await addDoc(collection(db, "FolderProfiles"), {
        folderName,
        folderPath: folderRef.fullPath,
      });

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imageRef = ref(folderRef, file.name);

        await uploadBytes(imageRef, file);

        const imageUrl = await getDownloadURL(imageRef);

        uploadedImageUrls.push(imageUrl);
      }

      setUploadedImageUrls(uploadedImageUrls);

      generateQRCodes();

      handleClose();

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
        <Grid
          container
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          marginTop="20px"
          gap={4}
        >
          <Grid item>
            <CustomTextField
              itemID="folder-name"
              itemLabel="Folder Name"
              value={folderName}
              handleChange={(e) => setFolderName(e.target.value)}
            />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'column',
              lg: 'row',
              xl: 'row',
            },
            flexWrap: 'wrap'
          }}
          display="flex"
          justifyContent="center"
          margin="auto"
        >
          {selectedFiles &&
            Array.from(selectedFiles).map((file, index) => (
              <ImagePreview key={index} src={URL.createObjectURL(file)} alt={file.name} />
            ))
          }
        </Grid>
        <Grid
          container
          flexDirection="row"
          display="flex"
          justifyContent="center"
          gap={4}
        >
          <ImageUploadBtn variant="contained" onClick={handleAdd}>
            Add
          </ImageUploadBtn>
          <CancelBtn variant="contained" onClick={handleCancelClick}>
            Cancel
          </CancelBtn>
        </Grid>
      </Container>
    )
  }


  return (
    <>
      <Btn onClick={handleOpen}>Add Folder</Btn>
      {isAdding && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {folders()}
        </Modal>
      )}
    </>
  );
};

export default Add;
