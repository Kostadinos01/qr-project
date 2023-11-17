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
import { EditProfilePageProps } from './types';
import { db, storage } from '../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageUploadBtn } from '../ImageUploader/style';
import CustomTextField from '../TextField';
import { addDoc, collection } from 'firebase/firestore';


const Edit = ({
  folderProfiles,
  setIsEditing,
  selectedFolderProfile,
  getFolderProfiles,
}: EditProfilePageProps) => {
  const [editedFolderName, setEditedFolderName] = useState(selectedFolderProfile?.folderName);
  const [selectedFiles, setSelectedFiles] = useState(selectedFolderProfile?.selectedFiles);

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleCancelClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setIsEditing(false);
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

  const handleEdit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!editedFolderName || !selectedFiles) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const editedProfile = {
      folderName: editedFolderName,
      selectedFiles,
    };

    selectedFolderProfile = editedProfile;

    if (!selectedFiles) {
      console.error('No files selected');
      return;
    }

    try {
      const folderRef = ref(storage, `${editedFolderName}/`);

      await addDoc(collection(db, "FolderProfiles"), {
        editedFolderName,
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
        title: 'Edited!',
        text: `Data has been Edited.`,
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
              value={editedFolderName}
              handleChange={(e) => setEditedFolderName(e.target.value)}
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
          <ImageUploadBtn variant="contained" onClick={handleEdit}>
            Save
          </ImageUploadBtn>
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