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
import { QRCodeImage } from '../FolderProfiles/style';
import { useQR } from '../../../hooks/useQR';

export default function FolderProfileOverview({
  children,
  folderName,
  selectedFiles,
}: FolderProfile) {
  const [open, setOpen] = useState(false);

  const { qrCodes } = useQR();

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
          {
            qrCodes.map((qr, index) => (
              <QRCodeImage
                src={qr}
                alt={`QR Code ${index}`}
                sx={{
                  width: "150px",
                  height: "150px",
                }}
              />
            ))
          }
        </Container>
      </Modal>
    </>
  );
}