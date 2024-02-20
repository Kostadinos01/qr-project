import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import Add from './Add';
import Edit from './Edit';

import { FolderProfile } from '../../types/Common';
import { db } from '../../firebase/firebase';
import Profiles from '../../pages/private/FolderProfiles';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getStorage, listAll, ref } from 'firebase/storage';
import Logout from '../Logout';
import { QRContext } from '../../context/QRContext';
import { Button } from '@mui/material';
import ShowQRImage from '../ShowQRImage';
import CustomTextField from '../TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { CenteredContainer } from './style';

const ImgsFolderDashboard = () => {
  const [folderProfiles, setFolderProfiles] = useState<FolderProfile[]>([]);
  const [selectedFolderProfile, setSelectedFolderProfile] = useState<FolderProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<ChangeEvent<HTMLInputElement> | undefined>(undefined);
  const [folderName, setFolderName] = useState<string | undefined>("");

  const {
    qrCodes,
  } = useContext(QRContext);

  const getFolders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "FolderProfiles"));
      const profiles = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      )) as FolderProfile[];

      setFolderProfiles(profiles);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  const handleEdit = (id: string) => {
    const [profile] = folderProfiles.filter((profile) => profile.id === id);

    setSelectedFolderProfile(profile);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        await deleteDoc(doc(db, 'FolderProfiles', id));

        const storage = getStorage();
        const folderRef = ref(storage, id);

        const items = await listAll(folderRef);

        items.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
        });

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Data and folder have been deleted.',
          showConfirmButton: false,
          timer: 1500,
        });

        const profilesCopy = folderProfiles.filter((profile) => profile.id !== id);
        setFolderProfiles(profilesCopy);
      }
    });
  };

  return (
    <>
      <Logout />
      <CenteredContainer container>
        <CustomTextField
          itemID="folder-name"
          itemLabel="Folder Name"
          value={folderName}
          handleChange={(e) => setFolderName(e.target.value)}
        />
        <Button onClick={() => setFolderName("")}>
          <DeleteIcon />
        </Button>
      </CenteredContainer>
      <CenteredContainer container>
        <ShowQRImage description={folderName} />
      </CenteredContainer>
      {!isEditing ? (
        <>
          <Profiles
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            folderProfiles={folderProfiles}
            qrCodes={qrCodes}
          />
          <Add
            folderProfiles={folderProfiles}
            setFolderProfiles={setFolderProfiles}
            getFolderProfiles={getFolders}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
          />
        </>
      ) : (
        <Edit
          folderProfiles={folderProfiles}
          selectedFolderProfile={selectedFolderProfile}
          setFolderProfiles={setFolderProfiles}
          setIsEditing={setIsEditing}
          getFolderProfiles={getFolders}
        />
      )}
    </>
  );
};

export default ImgsFolderDashboard;
