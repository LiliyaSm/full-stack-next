import { LoginButton, RegisterButton } from "@/components/buttons";
import { Flex, Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box>
        <Text fontSize={"4xl"} align={"center"}>
          Welcome
        </Text>
        <Box mt="4">
          <LoginButton />
          <RegisterButton />
        </Box>
      </Box>
    </Flex>
  );
}
