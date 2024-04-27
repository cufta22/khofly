import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./styles.module.scss";

const UnresponsiveInfobox = () => {
  return (
    <Alert
      variant="light"
      color="red"
      title="Messages from the search engines"
      icon={<IconInfoCircle />}
      className={classes.engines_message}
      ml={80}
    >
      <Text size="sm">Brave: 123</Text>
    </Alert>
  );
};

export default UnresponsiveInfobox;
