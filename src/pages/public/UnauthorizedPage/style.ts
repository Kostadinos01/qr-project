import { styled } from "@mui/material";

const CenteredEmoji = styled("center")({
  marginTop: '6rem',
  marginLeft: "auto",
  marginRight: "auto",
});

const Container = styled("div")({
  marginTop: "3rem",
  letterSpacing: "0.25rem",
});

const Title = styled("span")({
  color: "#a1a1a1",
  display: "block",
});

const Subtitle = styled("span")({
  color: "#6b7280",
  fontSize: "1.25rem",
});

const Center = styled("center")({
  marginTop: "6rem",
});

const Button = styled("button")({
  cursor: "pointer",
  fontFamily: "monospace",
  fontSize: "1.5rem",
  color: "#a1a1a1",
  backgroundColor: "#f1f1f1",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.25rem",
  transition: "box-shadow 0.2s ease-in-out",

  "&:hover": {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
});

export {
  CenteredEmoji,
  Container,
  Title,
  Subtitle,
  Center,
  Button,
}