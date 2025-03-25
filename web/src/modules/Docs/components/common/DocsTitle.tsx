import { Flex, Text } from "@mantine/core";
import type { IFC } from "@ts/global.types";

import classes from "./DocsTitle.module.scss";

interface Props extends IFC {
  leftSection?: any;
}

const DocsTitle: React.FC<Props> = ({ children, leftSection }) => {
  return (
    <Flex className={classes.docs_title} my="md">
      {leftSection && leftSection}

      <Text className={classes.docs_title_text}>{children}</Text>
    </Flex>
  );
};

export default DocsTitle;
