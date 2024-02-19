import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Grid, Modal } from '@mui/material';
import {
  CancelBtn,
  Container,
  ImagePreview,
} from './style';
import { EditProfilePageProps } from './types';
import { db, storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomTextField from '../TextField';
import { collection, doc, setDoc } from 'firebase/firestore';


const Edit = ({
  setIsEditing,
  selectedFolderProfile,
  folderProfiles,
  setFolderProfiles,
  getFolderProfiles,
}: EditProfilePageProps) => {
  const [folderName, setFolderName] = useState(selectedFolderProfile?.folderName);
  const [selectedFiles, setSelectedFiles] = useState(selectedFolderProfile?.selectedFiles);

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  const id = selectedFolderProfile?.id;

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  const handleCancelClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsEditing(false);
  }

  const handleEdit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!folderName || !selectedFiles) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const profile = {
      id,
      folderName,
      selectedFiles,
    };

    const profilesCollection = collection(db, "fibep2023Profiles");
    const profileDocRef = doc(profilesCollection, id);

    await setDoc(profileDocRef, {
      ...profile
    });

    setFolderProfiles(folderProfiles);
    setIsEditing(false);
    getFolderProfiles()

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        const folderRef = ref(storage, `${folderName}/`);

        const imageRef = ref(folderRef, file.name);

        await uploadBytes(imageRef, file);

        const imageUrl = await getDownloadURL(imageRef);

        uploadedImageUrls.push(imageUrl);
      }

      setUploadedImageUrls(uploadedImageUrls);

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

  const editFolder = () => {
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
          <CancelBtn variant="contained" onClick={handleCancelClick}>
            Cancel
          </CancelBtn>
        </Grid>
      </Container>
    )
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {editFolder()}
      </Modal>
    </>
  );
};

export default Edit;