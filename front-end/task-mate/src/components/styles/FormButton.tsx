import { Button } from "@chakra-ui/react";

interface Props {
  children: string;
}

const FormButton = ({ children }: Props) => {
  return (
    <Button
      type="submit"
      size={{
        base: "lg",
        sm: "xl",
        md: "2xl",
        lg: "2xl",
        xl: "2xl",
        "2xl": "2xl",
      }}
      width="40%"
      borderRadius="5px"
      border="none"
      fontSize={{
        base: "1rem",
        sm: "1.1rem",
        md: "1.5rem",
        lg: "1.5rem",
        xl: "1.3rem",
        "2xl": "2rem",
      }}
      _hover={{ backgroundColor: "#333", cursor: "pointer" }}
    >
      {children}
    </Button>
  );
};

export default FormButton;
