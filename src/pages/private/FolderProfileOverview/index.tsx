import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import {
  Container,
  OverviewContainer,
  Title,
  Subtitle,
  ImagePreview,
} from './style';
import { FolderProfile } from '../../../types/Common';
import { Divider } from '@mui/material';

export default function FolderProfileOverview({
  children,
  folderName,
  selectedFiles,
}: FolderProfile) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Container>
          <OverviewContainer>
            <Title>Profile Overview</Title>
            <Subtitle>{folderName}</Subtitle>
            <Divider />
            {selectedFiles &&
              Array.from(selectedFiles).map((file, index) => (
                <ImagePreview key={index} src={URL.createObjectURL(file)} alt={file.name} />
              ))
            }
          </OverviewContainer>
        </Container>
      </Modal>
    </>
  );
}