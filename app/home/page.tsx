import { LogoutButton } from "@/components/buttons";
import { Container } from "@chakra-ui/react";
import Data from "@/components/Data";

export default function Home() {
  return (
    <Container maxW="1200px">
      <LogoutButton />
      <Data />
    </Container>
  );
}
