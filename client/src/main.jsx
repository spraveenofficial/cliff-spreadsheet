import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "./Utils/chakra-theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ColorModeProvider theme={theme}>
      <App />
    </ColorModeProvider>
  </ChakraProvider>
);
