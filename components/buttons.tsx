"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  return (
    <Button
      size="md"
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
      m={2}
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <Button
        size="md"
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        m={2}
      >
        Sign up
      </Button>
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      size="md"
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
      m={2}
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};
