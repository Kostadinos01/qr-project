import { Dispatch, SetStateAction } from "react";
import { FolderProfile } from "../../types/Common";

export interface AddProfilePageProps {
  folderProfiles: FolderProfile[];
  setFolderProfiles: Dispatch<SetStateAction<FolderProfile[]>>;
}
