import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CustomTextField from '../TextField';
import {
  Container,
  AddFolderBtn,
  AddImgBtn,
  ImagePreview,
  ImageUploadBtn,
} from './style';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export default function CustomModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

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

  const uploadImagesToFirebase = async () => {
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
        handleClose();
      }

      setUploadedImageUrls(uploadedImageUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles(null);
  };

  return (
    <div>
      <AddFolderBtn onClick={handleOpen}>Open modal</AddFolderBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          {selectedFiles &&
            Array.from(selectedFiles).map((file, index) => (
              <ImagePreview key={index} src={URL.createObjectURL(file)} alt={file.name} />
            ))
          }
          <ImageUploadBtn variant="contained" onClick={uploadImagesToFirebase}>
            Upload The Folder
          </ImageUploadBtn>
        </Container>
      </Modal>
    </div>
  );
}
