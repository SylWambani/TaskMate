import { Heading } from "@chakra-ui/react";

interface Props {
  children: string;
  color: string;
}

const FormHeading: React.FC<Props> = ({
  children,
  color = "black",
}) => {
  return (
    <Heading
      as="h2"
      textAlign="center"
      marginTop={{ base:'5%',sm: "6%", md: "5%" }}
      fontWeight="800"
      fontSize={{
        base: "1.5rem",
        sm: "2rem",
        md: "2.3rem",
        lg: "2.5rem",
        xl: "2.5rem",
        "2xl": "3rem",
      }}
      fontStyle="normal"
      color={color}
    >
      {children}
    </Heading>
  );
};

export default FormHeading;
