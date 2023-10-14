import { LoginButton, RegisterButton } from "@/components/buttons";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <div>
        <LoginButton />
        <RegisterButton />
      </div>
    </Flex>
  );
}
