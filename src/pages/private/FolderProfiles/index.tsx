import React, { useState, MouseEvent, useContext } from 'react';
import {
  MainContainer,
  CustomCard,
  QRCodeImage,
  QRContainer,
} from './style';
import {
  IconButton,
  Typography,
  MenuItem,
  Menu,
  CardHeader,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import FolderProfileOverview from '../FolderProfileOverview';
import { FolderProfile } from '../../../types/Common';
import { QRContext } from '../../../context/QRContext';

interface Props {
  folderProfiles: FolderProfile[];
  handleDelete: (id: string) => void;
  handleDownload: (id: string) => void;
}

const FolderProfiles = ({
  folderProfiles,
  handleDelete,
  handleDownload,
}: Props) => {
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: null | HTMLElement }>({});

  const {
    qrCodes,
  } = useContext(QRContext);

  const open = Boolean(anchorEls);

  const handleOpenClick = (event: MouseEvent<HTMLButtonElement>, profileId: string) => {
    setAnchorEls({ ...anchorEls, [profileId]: event.currentTarget });
  };

  const handleClose = (profileId: string) => {
    setAnchorEls({ ...anchorEls, [profileId]: null });
  };

  return (
    <MainContainer
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
      marginTop="20px"
      width="85%"
    >
      {folderProfiles ? (
        folderProfiles.map((profile) => (
          <CustomCard key={profile.id}>
            <CardHeader
              action={
                <>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleOpenClick(event, profile.id!)}
                  >
                    <MoreVertIcon />
                  </IconButton><Menu
                    id="basic-menu"
                    anchorEl={anchorEls[profile.id!]}
                    open={Boolean(anchorEls[profile.id!])}
                    onClose={() => handleClose(profile.id!)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose(profile.id!);
                        handleDelete(profile.id!);
                      }}
                    >
                      <DeleteIcon />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose(profile.id!);
                        handleDownload(profile.imageUrl);
                      }}
                    >
                      <DownloadIcon />
                    </MenuItem>
                  </Menu>
                </>
              }
            />
            {
              qrCodes.map((qr, index) => (
                <QRContainer key={index}>
                  <QRCodeImage
                    src={qr}
                    alt={`QR Code ${index}`}
                    sx={{
                      width: "200px",
                      height: "200px",
                    }}
                  />
                </QRContainer>
              ))
            }
            {/* <FolderProfileOverview
              folderName={profile.folderName}
              selectedFiles={profile.selectedFiles}
            >
              <Typography
                sx={{
                  color: 'white',
                }}
              >
                {profile.folderName}
              </Typography>
            </FolderProfileOverview> */}
          </CustomCard>
        ))
      ) : (
        <Typography marginTop="200px">No Profiles Exist</Typography>
      )}
    </MainContainer>
  );
}

export default FolderProfiles;
