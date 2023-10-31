import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import {
  CenteredEmoji,
  Container,
  Title,
  Subtitle,
  Center,
  Button
} from "./style";
import Emoji from "./Emoji";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  const goBack = () => {
    try {
      startTransition(() => navigate("/login"));
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.emoji-404{\n\n  position: relative;\n  animation: mymove 2.5s infinite;\n}\n\n@keyframes mymove {\n  33%   {top: 0px;}\n  66%  {top: 20px;}\n  100%  {top: 0px}\n\n\n\n}\n",
        }}
      />
      <div>
        <CenteredEmoji>
          <Emoji />
          <Container>
            <Title sx={{ fontSize: { xs: "2.5rem", md: "6rem" } }}>
              Unauthorized
            </Title>
            <Subtitle>
              You do not have access to the requested page!
            </Subtitle>
          </Container>
        </CenteredEmoji>
        <Center>
          <Button onClick={goBack}>Go Back</Button>
        </Center>
      </div>
    </div>
  );
}
