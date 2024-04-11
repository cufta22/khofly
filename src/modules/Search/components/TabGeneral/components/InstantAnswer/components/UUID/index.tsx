import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import { Text } from "@mantine/core";

const IAUUID = () => {
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    setUuid(self.crypto.randomUUID());
  }, []);

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Random UUID v4
        </Text>
      }
    >
      <Text size="lg" fw={500}>
        {uuid}
      </Text>
    </IAWrapper>
  );
};

export default IAUUID;
