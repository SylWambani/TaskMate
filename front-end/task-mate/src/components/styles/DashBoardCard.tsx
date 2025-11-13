import { Card } from '@chakra-ui/react'

interface Props{
    children: string;
    onclick: () => void;
}

const DashBoardCard = ({children, onclick}:Props) => {
  return (
    <Card.Root
              width={{ base: "100%", sm:"47%" }}
              height={{ base: "45%", sm:"50%", lg:"60%" , xl:"100%"}}
              cursor="pointer"
              bg="rgba(255, 255, 255, 0.2)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              borderRadius="xl"
              transition="all 0.2s ease-in-out" 
              _hover={{
                transform: "scale(1.02)", 
                boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
              }}
              _active={{
                transform: "scale(0.95)", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
              onClick={onclick}
              fontSize={{ base: "1.5rem", sm:"2rem", md:"2.5rem" }}
              fontWeight="400"
              textAlign="center"
              justifyContent="center"
            >
          {children}
            </Card.Root>
  )
}

export default DashBoardCard