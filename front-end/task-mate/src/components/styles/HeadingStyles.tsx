import { Box, Heading } from "@chakra-ui/react";

const HeadingStyles = () => {
  return (
    <Box height="10%">
      <Heading as="h1" fontSize="2rem" fontWeight="900" fontStyle="normal">
        TASKMATE
      </Heading>
      <Heading as="h5" fontSize="1rem" fontWeight="400" fontStyle="italic">
        Where productivity meets simplicity.
      </Heading>
    </Box>
  );
};

export default HeadingStyles;
