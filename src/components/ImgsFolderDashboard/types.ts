import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FolderProfile } from "../../types/Common";

export interface AddProfilePageProps {
  folderProfiles: FolderProfile[];
  setFolderProfiles: Dispatch<SetStateAction<FolderProfile[]>>;
  getFolderProfiles: () => void;
  setSelectedFiles: Dispatch<SetStateAction<ChangeEvent<HTMLInputElement> | undefined>>;
  selectedFiles: ChangeEvent<HTMLInputElement> | undefined;
}

export interface EditProfilePageProps {
  folderProfiles: FolderProfile[];
  selectedFolderProfile: FolderProfile | null;
  setFolderProfiles: (arg: FolderProfile[]) => void;
  setIsEditing: (isEditing: boolean) => void;
  getFolderProfiles: () => void;
}
