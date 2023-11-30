import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Add from './Add';
import Edit from './Edit';

import { FolderProfile } from '../../types/Common';
import { db } from '../../firebase/firebase';
import Profiles from '../../pages/private/FolderProfiles';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

const ImgsFolderDashboard = () => {
  const [folderProfiles, setFolderProfiles] = useState<FolderProfile[]>([]);
  const [selectedFolderProfile, setSelectedFolderProfile] = useState<FolderProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        deleteDoc(doc(db, "FolderProfiles", id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: "Data has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });

        const profilesCopy = folderProfiles.filter(profile => profile.id !== id);
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
