import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FolderProfile } from '../../types/Common';
import Profiles from '../../pages/private/FolderProfiles';
import { db } from '../../firebase/firebase';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {
  deleteObject,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import Logout from '../Logout';
import Add from './Add';

const ImgsFolderDashboard = () => {
  const [folderProfiles, setFolderProfiles] = useState<FolderProfile[]>([]);

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

  const handleDownload = async (imageUrl: string | undefined) => {
    try {
      if (!imageUrl) {
        console.error('Image URL is undefined.');
        return;
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to download image.');
      }
      const imageBlob = await response.blob();

      const storage = getStorage();
      const fileName = imageUrl.split('/').pop();
      const fileRef = ref(storage, fileName);

      await uploadBytes(fileRef, imageBlob);

      console.log('Image downloaded and stored successfully.');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      <Logout />
      <Add
        folderProfiles={folderProfiles}
        setFolderProfiles={setFolderProfiles}
      />
      <Profiles
        handleDelete={handleDelete}
        handleDownload={handleDownload}
        folderProfiles={folderProfiles}
      />
    </>
  );
};

export default ImgsFolderDashboard;
