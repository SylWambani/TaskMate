import { Heading } from "@chakra-ui/react";

interface Props{
    children: string;
}

const FormHeading = ({children}:Props) => {
  return (
    <Heading
      as="h2"
      textAlign="center"
      marginBottom="1.5%"
      fontWeight="800"
      fontSize={{base:"1.5rem", sm:"2rem", md:"2.3rem", lg:"2.5rem", xl:"2.5rem", "2xl":"3rem"}}
      fontStyle="normal"
    >{children}</Heading>
  );
};

export default FormHeading;
