import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { FolderProfile } from "../../types/Common";

export interface AddProfilePageProps {
  folderProfiles: FolderProfile[];
  setFolderProfiles: Dispatch<SetStateAction<FolderProfile[]>>;
  getFolderProfiles: () => void;
  setSelectedFiles: Dispatch<SetStateAction<File[] | null>>;
  selectedFiles: File[] | null;
  uploadedImageUrls: string[];
  generateQRCodes: (imageUrls: string[]) => Promise<void>;
  handleAddImgClick: (e: { preventDefault: () => void; }) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFileRef: MutableRefObject<HTMLInputElement | null>;
}

export interface EditProfilePageProps {
  folderProfiles: FolderProfile[];
  selectedFolderProfile: FolderProfile | null;
  setFolderProfiles: (arg: FolderProfile[]) => void;
  setIsEditing: (isEditing: boolean) => void;
  getFolderProfiles: () => void;
}
