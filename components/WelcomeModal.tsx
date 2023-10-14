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
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent } from "react";

const WelcomeModal = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
    });
    const { name, title } = await res.json();
    setFormValues({ name, title });
    if (!name || !title) setIsOpen(true);
  };

  const submit = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(formValues),
    });
    setIsOpen(false);
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
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setStepNumber(1)}>
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
            <Button variant="ghost" onClick={() => setStepNumber(0)}>
              Prev
            </Button>
            <Button colorScheme="blue" mr={3} onClick={submit}>
              Submit
            </Button>
          </ModalFooter>
        </>
      );
    }
  };
  return (
    <>
      {!isOpen && (
        <>
          {formValues.name} {formValues.title}
        </>
      )}
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>{getStep()}</ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
