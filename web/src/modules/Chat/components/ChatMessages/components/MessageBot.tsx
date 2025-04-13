import { Flex, Table, Text, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconSparkles } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useAIChatStore } from "@store/aichat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Plugin for GFM

// For code highlight
import ChatCodeHighlight from "../../ChatCodeHighlight/ChatCodeHighlight";

interface Props {
  content: string;
}

const MessageBot: React.FC<Props> = ({ content }) => {
  const theme = useMantineTheme();

  const model = useAIChatStore((state) => state.model);

  return (
    <Flex className={classes.message_bot} direction="column">
      <Flex className={classes.message_header}>
        <Flex align="center" gap="sm">
          <IconSparkles style={getIconStyle(26)} color={theme.colors.pink[5]} />

          <Text>{model.label}</Text>
        </Flex>
      </Flex>

      <Flex className={classes.message_wrapper}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return match ? (
                <ChatCodeHighlight language={match[1]} code={String(children).replace(/\n$/, "")} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table({ node, ...props }) {
              return <Table {...props} />;
            },
            thead({ node, ...props }) {
              return <Table.Thead {...props} />;
            },
            th({ node, ...props }) {
              return <Table.Th {...props} />;
            },
            tbody({ node, ...props }) {
              return <Table.Tbody {...props} />;
            },
            tr({ node, ...props }) {
              return <Table.Tr {...props} />;
            },
            td({ node, ...props }) {
              return <Table.Td {...props} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>

        {/* {content} */}
      </Flex>
    </Flex>
  );
};

export default MessageBot;
