import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "./Utils/chakra-theme";
import { AuthProvider } from "./Context/auth-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ColorModeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ColorModeProvider>
  </ChakraProvider>
);
