import { Box, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { theme } from "./theme";
import Layout from "./components/Layout";
import { DiscoComponent } from "./components/DiscoComponent";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "dotenv";
import "@fontsource/inter";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" flexDirection="column" height="100vh">
        <Layout>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Layout>
        <DiscoComponent />
      </Box>
    </ChakraProvider>
  );
}

export default App;
