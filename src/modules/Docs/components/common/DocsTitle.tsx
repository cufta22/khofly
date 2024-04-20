import { Flex, Text } from "@mantine/core";
import { IFC } from "@ts/global.types";
import React from "react";

interface Props extends IFC {
  leftSection?: any;
}

const DocsTitle: React.FC<Props> = ({ children, leftSection }) => {
  return (
    <Flex direction="row" align="center" gap="lg" my="md">
      {leftSection && leftSection}

      <Text fz="34" fw={600}>
        {children}
      </Text>
    </Flex>
  );
};

export default DocsTitle;
