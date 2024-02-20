import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import {
  AddImgBtn,
  ClearAllBtn,
  QRContainer,
  QRCodeImage,
  DownloadLink,
} from './style'

import { QRContext } from '../../context/QRContext'

interface Props {
  description: string | undefined;
}

const ShowQRImage = ({ description }: Props) => {
  const {
    handleAddImgClick,
    handleClearAllBtnClick,
    handleImageChange,
    inputFileRef,
    qrCodes,
    loading,
  } = useContext(QRContext);

  return (
    <>
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
          onChange={handleImageChange}
        />
        <ClearAllBtn
          onClick={handleClearAllBtnClick}
        >
          CLEAR ALL
        </ClearAllBtn>
      </Grid>
      {loading && (
        <LoadingSpinner />
      )}
      {qrCodes.map((qr, index) => (
        <QRContainer key={index}>
          <Typography textAlign="center">{description}</Typography>
          <QRCodeImage
            src={qr}
            alt={`QR Code ${index}`}
            sx={{
              width: "250px",
              height: "250px",
            }}
          />
          <DownloadLink href={qr} download={`qrcode_${index}.png`}>
            Download QR
          </DownloadLink>
        </QRContainer>
      ))}
    </>
  )
}

export default ShowQRImage