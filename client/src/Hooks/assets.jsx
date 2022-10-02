import { useToast } from "@chakra-ui/react";

export const useAssets = () => {
  const toast = useToast();

  const myToast = (message, status) => {
    toast({
      title: message,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
    return;
  };
  return { toast: myToast };
};
