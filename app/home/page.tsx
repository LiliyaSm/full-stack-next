import { Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import Data from "@/components/Data";

export default function Home() {
  return (
    <Container maxW="1200px">
      <Header />
      <Data />
    </Container>
  );
}
