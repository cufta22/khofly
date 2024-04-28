import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";

interface Props {
  unresponsive_engines: ISearXNGResultsGeneral["unresponsive_engines"];
}

const UnresponsiveInfobox: React.FC<Props> = ({ unresponsive_engines }) => {
  return (
    <Alert
      variant="light"
      color="red"
      title="Messages from the search engines"
      icon={<IconInfoCircle />}
      className={classes.engines_message}
      ml={80}
    >
      {unresponsive_engines.map((msg, i) => {
        return (
          <Text key={i} size="sm">
            {msg[0]} ( {msg[1]} )
          </Text>
        );
      })}
    </Alert>
  );
};

export default UnresponsiveInfobox;
