"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";

const WelcomeModal = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { onClose } = useDisclosure();

  const getData = async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
    });
    const { name, title } = await res.json();
    setFormValues({ name, title });
    if (!name || !title) setIsOpen(true);
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(formValues),
      });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getStep = () => {
    if (stepNumber === 0) {
      return (
        <>
          <ModalHeader>Welcome! Please enter your name</ModalHeader>
          <ModalBody>
            <Input
              value={formValues.name}
              onChange={handleChange}
              name="name"
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!formValues.name}
              variant="ghost"
              onClick={() => setStepNumber(1)}
              size="md"
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
            >
              Next
            </Button>
          </ModalFooter>
        </>
      );
    } else if (stepNumber === 1) {
      return (
        <>
          <ModalHeader>Enter your job title</ModalHeader>
          <ModalBody>
            <Input
              value={formValues.title}
              onChange={handleChange}
              name="title"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => setStepNumber(0)}
              size="md"
              mr={3}
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
            >
              Prev
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={!formValues.title}
              onClick={submit}
              loadingText="Submitting"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </>
      );
    }
  };
  return (
    <>
      <Box>
        {!isOpen && formValues.name && formValues.title && (
          <>
            {formValues.name}, {formValues.title}
          </>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>{getStep()}</ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
