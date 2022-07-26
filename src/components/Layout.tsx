import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex
      alignItems="right"
      justifyContent="right"
      bg="gray.800"
    >
      {children}
    </Flex>
  );
  
}
