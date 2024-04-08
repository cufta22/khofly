import { Text } from "@mantine/core";
import { IAWrapper } from "../../wrapper";

const IANeofetch = () => {
  return (
    <IAWrapper
      label={
        <Text c="dimmed" size="sm">
          This is a command like instant answer
        </Text>
      }
    >
      Neofetch
    </IAWrapper>
  );
};

export default IANeofetch;
