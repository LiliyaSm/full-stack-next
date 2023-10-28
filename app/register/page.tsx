"use client";
import { signIn } from "next-auth/react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useState, FormEvent } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const errorToast: UseToastOptions = {
  status: "error",
  duration: 6000,
  isClosable: true,
};

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  let [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      password: (e.target as HTMLFormElement).password.value,
      email: (e.target as HTMLFormElement).email.value,
    };
    try {
      setIsLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const { message } = await res.json();
        toast({
          // title: 'Account created.',
          description: message,
          ...errorToast,
        });
        return;
      }

      signIn("credentials", { ...data, callbackUrl: "/home" });
    } catch (error: any) {
      console.error(error);
      toast({
        // title: 'Account created.',
        description: error.message,
        ...errorToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create an account
          </Heading>
          <Text align={"center"}>
            Already a user?{" "}
            <Link onClick={() => signIn()} color={"blue.400"}>
              Login
            </Link>
          </Text>
        </Stack>
        <form onSubmit={onSubmit}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Text pt={6} align="right">
                <Link href="/" color={"blue.400"}>
                  Return to the main page
                </Link>
              </Text>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
