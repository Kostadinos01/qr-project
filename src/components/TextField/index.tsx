import React from 'react'

import { Grid, TextField } from '@mui/material'

interface CustomTextFieldProps {
  itemID: string;
  itemLabel: string;
  value: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField = (
  { itemID, itemLabel, value, handleChange }: CustomTextFieldProps) => {
  return (
    <Grid
      item
      sm={2}
      md={3}
      display="flex"
      justifyContent="center"
      margin="auto"
      marginBottom="20px"
    >
      <TextField
        id={itemID}
        label={itemLabel}
        value={value}
        multiline
        maxRows={6}
        onChange={handleChange}
      />
    </Grid>
  )
}

export default CustomTextField