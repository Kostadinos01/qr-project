import React, { useState, MouseEvent } from 'react';
import {
  MainContainer,
  CustomCard,
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
import EditIcon from '@mui/icons-material/Edit';
import FolderProfileOverview from '../FolderProfileOverview';
import { FolderProfile } from '../../../types/Common';

interface Props {
  folderProfiles: FolderProfile[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

const FolderProfiles = ({ folderProfiles, handleDelete, handleEdit }: Props) => {
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: null | HTMLElement }>({});

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
          <FolderProfileOverview
            folderName={profile.folderName}
            selectedFiles={profile.selectedFiles}
          >
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
                          handleEdit(profile.id!);
                        }}
                      >
                        <EditIcon />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose(profile.id!);
                          handleDelete(profile.id!);
                        }}
                      >
                        <DeleteIcon />
                      </MenuItem>
                    </Menu></>
                }
              />
            </CustomCard>
          </FolderProfileOverview>
        ))
      ) : (
        <Typography marginTop="200px">No Profiles Exist</Typography>
      )}
    </MainContainer>
  );
}

export default FolderProfiles;
