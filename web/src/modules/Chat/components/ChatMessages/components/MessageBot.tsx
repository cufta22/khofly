import { Flex, Text, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconSparkles } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useAIChatStore } from "@store/aichat";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const MessageBot: React.FC<Props> = ({ content }) => {
  const theme = useMantineTheme();

  const model = useAIChatStore((state) => state.model);

  return (
    <Flex className={classes.message_bot} direction="column">
      <Flex className={classes.message_header} mb="xs">
        <Flex align="center" gap="sm">
          <IconSparkles style={getIconStyle(26)} color={theme.colors.pink[5]} />

          <Text>{model.label}</Text>
        </Flex>
      </Flex>

      <Flex className={classes.message_wrapper}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Flex>
    </Flex>
  );
};

export default MessageBot;
