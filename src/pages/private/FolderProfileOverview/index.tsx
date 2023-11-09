import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import {
  Container,
  OverviewContainer,
  Title,
  Subtitle,
} from './style';
import { FolderProfile } from '../../../types/Common';

export default function ProfileOverview({
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
          </OverviewContainer>
        </Container>
      </Modal>
    </>
  );
}