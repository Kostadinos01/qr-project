import React from 'react'

import { TextField } from '@mui/material'

interface CustomTextFieldProps {
  itemID: string;
  itemLabel: string;
  value: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField = (
  { itemID, itemLabel, value, handleChange }: CustomTextFieldProps) => {
  return (
    <TextField
      id={itemID}
      label={itemLabel}
      value={value}
      multiline
      maxRows={6}
      onChange={handleChange}
    />
  )
}

export default CustomTextField