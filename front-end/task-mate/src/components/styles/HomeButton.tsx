import { Button } from "@chakra-ui/react";

interface Props{
    children: string;
    onclick: () => void;
}

const HomeButton = ({children, onclick}:Props) => {
  return (
    <Button
      onClick={onclick} 
      width="50%"
      size={{base:"lg", sm:"xl", md:"2xl", lg:"xl", xl:"xl", "2xl":"2xl"}}
      borderRadius="15px"
      border="none"
      _hover={{ backgroundColor: "#333", cursor: "pointer" }}
    >{children}</Button>
  );
};

export default HomeButton;
