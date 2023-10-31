import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CustomTextField from '../TextField';
import { ImageInput } from '../ImageUploader/style';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CustomTextField
            itemID='company-position'
            itemLabel='Company Position'
            value={folderName}
            handleChange={(e) => setFolderName(e.target.value)}
          />
          <ImageInput
            type="file"
            placeholder="Select your image"
            onChange={handleImageChange}
          />
        </Box>
      </Modal>
    </div>
  );
}