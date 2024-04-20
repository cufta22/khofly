import { Flex, Text } from "@mantine/core";
import { IFC } from "@ts/global.types";
import React from "react";

interface Props extends IFC {
  leftSection?: any;
}

const DocsSubtitle: React.FC<Props> = ({ children, leftSection }) => {
  return (
    <Flex direction="row" align="center" gap="lg" mt="md" mb="xs">
      {leftSection && leftSection}

      <Text size="xl" fw="bold">
        {children}
      </Text>
    </Flex>
  );
};

export default DocsSubtitle;
