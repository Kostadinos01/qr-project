import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { Grid, Modal } from '@mui/material';
import {
  Btn,
  Container,
} from './style';
import { AddProfilePageProps } from './types';
import { db } from '../../firebase/firebase';
import CustomTextField from '../TextField';
import { addDoc, collection } from 'firebase/firestore';
import { QRContext } from '../../context/QRContext';
import { AddImgBtn, ClearAllBtn } from '../ShowQRImage/style';

const Add = ({
  folderProfiles,
  setFolderProfiles,
  getFolderProfiles,
  selectedFiles,
  setSelectedFiles,
}: AddProfilePageProps) => {
  const [folderName, setFolderName] = useState<string | undefined>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    handleImageChange,
    uploadedImageUrls,
    handleAddImgClick,
    handleClearAllBtnClick,
    inputFileRef,
  } = useContext(QRContext);

  const handleOpen = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsAdding(true);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(undefined);
    setIsAdding(false);
    setFolderName("");
  };

  const handleAdd = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!selectedFiles) {
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

    await handleImageChange(selectedFiles);
  };

  const folders = () => {
    return (
      <Container>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="20px"
          gap={4}
        >
          <CustomTextField
            itemID="folder-name"
            itemLabel="Folder Name"
            value={folderName}
            handleChange={(e) => setFolderName(e.target.value)}
          />
        </Grid>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            marginTop: 2,
          }}
        >
          <AddImgBtn onClick={handleAddImgClick}>Add Image</AddImgBtn>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleAdd}
          />
          <ClearAllBtn
            onClick={handleClearAllBtnClick}
          >
            CLEAR ALL
          </ClearAllBtn>
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
