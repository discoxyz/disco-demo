export const ButtonStyles = {
  variants: {
    connectWallet: {
      border: "1px solid #C295F3",
      color: "white",
      px: 3,
      _hover: {
        cursor: "pointer",
        background: "rgba(194,149,243, 0.7)",
      },
    },
    connectedWallet: {
      border: "1px solid white",
      _hover: {
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
};

export const ContainerStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    container: {
      background: "#1A1D1F",
      maxWidth: "100vw",
      margin: "auto",
      textColor: "white",
      justifyContent: "center",
      flexDirection: "column",
      flexGrow: 1,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      px: 0,
      mt: 4,
      justifyContent: "center",
      maxWidth: "100vw",
    },
  },
};

export const LinkStyles = {
  variants: {
    link: {
      color: "#C295F3",
    },
  },
};

export const TextStyles = {
  variants: {
    heading: {
      fontFamily: "Inter",
      fontSize: "28px",
      fontWeight: 700,
      textAlign: "center",
      textDecoration: "underline",
      mb: 4,
    },
    details: {
      fontSize: "20px",
      textAlign: "center",
      textDecoration: "none",
    },
  },
};
