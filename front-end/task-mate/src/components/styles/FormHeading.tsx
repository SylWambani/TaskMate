import { Heading } from "@chakra-ui/react";

interface Props{
    children: string;
}

const FormHeading = ({children}:Props) => {
  return (
    <Heading
      as="h2"
      textAlign="center"
      marginBottom="2.5%"
      fontWeight="800"
      fontSize="2.5rem"
      fontStyle="normal"
    >{children}</Heading>
  );
};

export default FormHeading;
