import { Flex } from "@chakra-ui/react";
import { AlertTriangle, Flag, Star } from "lucide-react";

export const priorityLabel = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return (
          <Flex>
            <AlertTriangle size={16} color="red" />
            <span style={{ marginLeft: "4px" }}>High</span>
          </Flex>
        );
      case "medium":
        return (
          <Flex>
            <Flag size={16} color="orange" />
            <span style={{ marginLeft: "4px" }}>Medium</span>
          </Flex>
        );
      case "low":
        return (
          <Flex>
            <Star size={16} color="gray" />
            <span style={{ marginLeft: "4px" }}>Low</span>
          </Flex>
        );
      default:
        return null;
    }
  };