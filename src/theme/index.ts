import { extendTheme } from "@chakra-ui/react";
import {
  ButtonStyles as Button,
  ContainerStyles as Container,
  LinkStyles as Link,
  TextStyles as Text,
} from "./styles";

export const theme = extendTheme({
  colors: {
    primary: "#ff0000",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  background: {
    default: "#1A1D1F",
    paper: "#1A1D1F",
  },
  common: {
    black: "#000",
    white: "#fff",
  },
  text: {
    primary: "#fff",
    secondary: "#ffffffb3",
    disabled: "#ffffff80",
  },
  divider: "#0000001f",
  primary: {
    light: "#F6C6FF",
    main: "#C295F3",
    dark: "#9066C0",
    contrastText: "#000",
  },
  secondary: {
    light: "#63F4FF",
    main: "#01C0D6",
    dark: "#0090A5",
    contrastText: "#000",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#f5f5f5",
    A200: "#eee",
    A400: "#bdbdbd",
    A700: "#616161",
  },
  error: {
    light: "#ff0000",
    main: "#f44336",
    dark: "#d32f2f",
    contrastText: "#000",
  },
  warning: {
    light: "#ffb74d",
    main: "#ffa726",
    dark: "#f57c00",
    contrastText: "#000",
  },
  info: {
    light: "#4fc3f7",
    main: "#29b6f6",
    dark: "#0288d1",
    contrastText: "#000",
  },
  success: {
    light: "#81c784",
    main: "#66bb6a",
    dark: "#388e3c",
    contrastText: "#000",
  },
  external: {
    twitter: "#1DA1F2",
  },
  components: {
    Button,
    Container,
    Link,
    Text,
  },
});
