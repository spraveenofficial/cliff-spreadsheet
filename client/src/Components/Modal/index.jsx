import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const MyModal = (props) => {
    const { isOpen, children, onClose } = props;
  
    const OverlayOne = () => (
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
    );
  
    const [overlay, setOverlay] = useState(<OverlayOne />);
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={onClose}
        onClickOutside={onClose}
        isCentered
        scrollBehavior="inside"
      >
        {overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export { MyModal };
  