"use client";

import WelcomeModal from "@/components/WelcomeModal";
import { LogoutButton } from "@/components/buttons";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";

const Header = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
  });
  return (
    <HStack
      justify="space-between"
      align="center"
      my={4}
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
      p={2}
    >
      <WelcomeModal />
      <LogoutButton />
    </HStack>
  );
};

export default Header;
