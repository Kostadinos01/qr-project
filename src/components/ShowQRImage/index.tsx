import React, { useContext, useState, MouseEvent } from 'react'
import {
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import {
  AddImgBtn,
  ClearAllBtn,
  QRContainer,
  QRCodeImage,
  DownloadLink,
} from './style'
import { QRContext } from '../../context/QRContext'
import { CustomCard } from '../../pages/private/FolderProfiles/style'
import LoadingSpinner from '../LoadingSpinner'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
  description: string | undefined;
}

const ShowQRImage = ({ description }: Props) => {
  const [anchorEls, setAnchorEls] = useState<{ [key: number]: null | HTMLElement }>({});

  const {
    handleAddImgClick,
    handleClearAllBtnClick,
    handleImageChange,
    inputFileRef,
    qrCodes,
    loading,
    handleDelete,
  } = useContext(QRContext);

  const open = Boolean(anchorEls);

  const handleOpenClick = (event: MouseEvent<HTMLButtonElement>, profileId: number) => {
    setAnchorEls({ ...anchorEls, [profileId]: event.currentTarget });
  };

  const handleClose = (profileId: number) => {
    setAnchorEls({ ...anchorEls, [profileId]: null });
  };


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
        <CustomCard key={index}>
          <CardHeader
            action={
              <>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event) => handleOpenClick(event, index)}
                >
                  <MoreVertIcon />
                </IconButton><Menu
                  id="basic-menu"
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleClose(index)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose(index);
                      handleDelete(index.toString());
                    }}
                  >
                    <DeleteIcon />
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      handleClose(index);
                      handleDownload(qr);
                    }}
                  >
                    <DownloadIcon />
                  </MenuItem> */}
                </Menu>
              </>
            }
          />
          <QRContainer key={index}>
            <Typography textAlign="center">{description}</Typography>
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
        </CustomCard>
      ))}
    </>
  )
}

export default ShowQRImage