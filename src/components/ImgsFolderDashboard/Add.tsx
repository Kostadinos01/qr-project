import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Grid } from '@mui/material';
import {
  CenteredContainer,
} from './style';
import { AddProfilePageProps } from './types';
import { db, storage } from '../../firebase/firebase';
import CustomTextField from '../TextField';
import { addDoc, collection } from 'firebase/firestore';
import { QRContext } from '../../context/QRContext';
import { AddImgBtn, ClearAllBtn } from '../ShowQRImage/style';
import LoadingSpinner from '../LoadingSpinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Add = ({
  folderProfiles,
  setFolderProfiles,
}: AddProfilePageProps) => {
  const [folderName, setFolderName] = useState<string | undefined>("");

  const {
    generateQRCodes,
    uploadedImageUrls,
    setUploadedImageUrls,
    handleAddImgClick,
    handleClearAllBtnClick,
    inputFileRef,
    loading,
    setLoading,
  } = useContext(QRContext);

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await addDoc(collection(db, "FolderProfiles"), {
        folderName,
        uploadedImageUrls,
      });

      setFolderProfiles(folderProfiles);

      const selectedFiles = e.target.files;

      if (selectedFiles) {
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

        generateQRCodes(uploadedImageUrls);

        await addDoc(collection(db, "FolderProfiles"), {
          uploadedImageUrls,
        });

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `Data has been Added.`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <>
      <CenteredContainer container>
        <CustomTextField
          itemID="folder-name"
          itemLabel="Folder Name"
          value={folderName}
          handleChange={(e) => setFolderName(e.target.value)} />
        <Button onClick={() => setFolderName("")}>
          <DeleteIcon />
        </Button>
      </CenteredContainer><Grid
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
          onChange={handleAdd} />
        <ClearAllBtn
          onClick={handleClearAllBtnClick}
        >
          CLEAR ALL
        </ClearAllBtn>
      </Grid><Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {loading && (
          <LoadingSpinner />
        )}
      </Grid>
    </>
  );
};

export default Add;
