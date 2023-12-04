import React from "react";

export interface ChildrenPropTypes {
  children: React.ReactNode;
}

export interface AuthProps {
  formTitle: string;
  email: string;
  password: string;
  btnName: string;
  btnValue: string;
  btnTitle: string;
  handleEmailChange: (e: any) => void;
  handlePasswordChange: (e: any) => void;
  handleClick: (e: any) => void;
  btnNavTitle: string;
}

export interface FolderProfile {
  children?: React.ReactNode;
  id?: string | undefined;
  url?: string | undefined;
  folderName: string;
  selectedFiles: File[] | null;
}