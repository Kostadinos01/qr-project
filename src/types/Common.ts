import React from "react";

export interface ChildrenPropTypes {
  children: React.ReactNode;
}

export interface FolderProfile {
  children?: React.ReactNode;
  id?: string | undefined;
  imageUrl: string;
  folderName: string;
  selectedFiles: File[] | null;
}
