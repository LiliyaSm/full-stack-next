import { LogoutButton } from "@/components/buttons";
import { Container } from "@chakra-ui/react";
import Data from "@/components/Data";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  return (
    <Container maxW="1200px">
      <WelcomeModal />
      <LogoutButton />
      <Data />
    </Container>
  );
}