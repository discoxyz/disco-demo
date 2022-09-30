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
      bg="#1A1D1F"
      py={2}
      pr={2}
      zIndex={1}
      boxShadow="0px 4px 8px black;"
    >
      {children}
    </Flex>
  );
}
