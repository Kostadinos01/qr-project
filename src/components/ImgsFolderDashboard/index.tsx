import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Add from './Add';
import Edit from './Edit';
import {
  ref,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { FolderProfile } from '../../types/Common';
import { storage } from '../../firebase/firebase';
import Profiles from '../../pages/private/FolderProfiles';

const ImgsFolderDashboard = () => {
  const [folderProfiles, setFolderProfiles] = useState<FolderProfile[]>([]);
  const [selectedFolderProfile, setSelectedFolderProfile] = useState<FolderProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getFolders = async () => {
    try {
      const folderRef = ref(storage, "FolderProfiles");
      const listResult = await listAll(folderRef);

      const profiles = await Promise.all(
        listResult.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { id: item.name, url } as FolderProfile;
        })
      );

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
        const fileRef = ref(storage, `FolderProfiles/${id}`);
        await deleteObject(fileRef);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Data has been deleted.',
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
      {!isEditing && (
        <>
          <Profiles
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            folderProfiles={folderProfiles}
          />
          <Add
            folderProfiles={folderProfiles}
            setFolderProfiles={setFolderProfiles}
            getFolderProfiles={getFolders}
          />
        </>
      )}
      {isEditing && (
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
