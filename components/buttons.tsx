"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export const LoginButton = () => {
  return (
    <Button m={2} onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Button m={2}>
      <Link href="/register">Sign up</Link>
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button m={2} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
