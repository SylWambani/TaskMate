import { Box, Heading } from "@chakra-ui/react";
const HeadingStyles = () => {
  return (
    <Box
      height="10%"
      position="relative"
      padding={{
        base: "0.5rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "1.5rem",
      }}
    >
      <Heading
        as="h1"
        fontSize={{
          base: "1.5rem",
          sm: "2.2rem",
          md: "2.4rem",
          lg: "2.5rem",
          xl: "2.5rem",
          "2xl":"3rem"
        }}
        fontWeight="900"
        fontStyle="normal"
        marginBottom="0.6%"
      >
        TASKMATE
      </Heading>
      <Heading
        as="h5"
        fontSize={{
          base: "0.6rem",
          sm: "0.9rem",
          md: "1.2rem",
          lg: "1.3rem",
          xl: "1.2rem",
          "2xl":"1.5rem"
        }}
        fontWeight="400"
        fontStyle="italic"
      >
        Where productivity meets simplicity.
      </Heading>
    </Box>
  );
};

export default HeadingStyles;
