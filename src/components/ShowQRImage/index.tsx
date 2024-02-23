import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import {
  AddImgBtn,
  QRContainer,
  QRCodeImage,
  DownloadLink,
} from './style'
import { QRContext } from '../../context/QRContext'
import LoadingSpinner from '../LoadingSpinner'

const ShowQRImage = () => {

  const {
    handleAddImgClick,
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
      </Grid>
      {loading && (
        <LoadingSpinner />
      )}
      {qrCodes.map((qr, index) => (

        <QRContainer key={index}>
          <QRCodeImage
            src={qr}
            alt={`QR Code ${index}`}
            sx={{
              width: "200px",
              height: "200px",
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