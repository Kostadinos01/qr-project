import React, { useState } from 'react';
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
import { db } from '../../firebase/firebase';
import CustomTextField from '../TextField';
import { addDoc, collection } from 'firebase/firestore';

const Add = ({
  folderProfiles,
  setFolderProfiles,
  getFolderProfiles,
  selectedFiles,
  setSelectedFiles,
  uploadedImageUrls,
  generateQRCodes,
  handleAddImgClick,
  handleImageChange,
  inputFileRef,
}: AddProfilePageProps) => {
  const [folderName, setFolderName] = useState<string | undefined>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsAdding(true);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  const handleCancelClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setSelectedFiles(null);
    setIsAdding(false);
  }

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

    try {
      await addDoc(collection(db, "FolderProfiles"), {
        folderName,
        uploadedImageUrls,
      });

      setFolderProfiles(folderProfiles);
      setIsAdding(false);
      getFolderProfiles();

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
    generateQRCodes(uploadedImageUrls);
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
            <AddImgBtn onClick={handleAddImgClick}>Add Image</AddImgBtn>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={inputFileRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
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
          {selectedFiles && selectedFiles.map((file, index) => (
            <ImagePreview key={index} src={URL.createObjectURL(file)} alt={file.name} />
          ))}
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
