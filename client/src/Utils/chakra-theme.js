import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const styles = {
    global: (props) => ({
        body: {
            color: mode("#fff", "#fff")(props),
            bg: mode("#fff", "#141214")(props),
        },
    }),
};

const theme = extendTheme({
    fonts: {
        body: "Poppins, system-ui, sans-serif",
    },
    styles,
    config,
});

export default theme;