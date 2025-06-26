import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

const IAUUID = () => {
  const [uuid, setUuid] = useState("");

  const updateUUID = () => {
    setUuid(self.crypto.randomUUID());
  };

  useEffect(() => {
    updateUUID();
  }, []);

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Random UUID v4
        </Text>
      }
    >
      <Flex align="center" justify="space-between">
        <Text size="lg" fw={500}>
          {uuid}
        </Text>

        <ActionIcon size="lg" variant="subtle" onClick={updateUUID}>
          <IconReload />
        </ActionIcon>
      </Flex>
    </IAWrapper>
  );
};

export default IAUUID;
