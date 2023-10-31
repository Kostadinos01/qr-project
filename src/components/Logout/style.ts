import {
  Button,
  styled,
} from "@mui/material";

import {
  theme
} from "../../theme/pallete";

const { error } = theme.palette;

export const LogoutBtn = styled(Button)({
  color: error.main,
  fontWeight: "900",
  textAlign: "center",
  fontSize: "40px",
  marginLeft: '20px',
  background: "none",

  "&:hover": {
    color: error.dark,
    background: "none",
  },
});