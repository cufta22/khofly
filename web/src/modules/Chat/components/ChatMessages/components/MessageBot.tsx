import { Accordion, Flex, Loader, Table, Text, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconBulb } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useAIChatStore } from "@store/aichat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Plugin for GFM

// For code highlight
import ChatCodeHighlight from "../../ChatCodeHighlight/ChatCodeHighlight";
import { useMemo } from "react";
import { getAIChatModelIcon } from "@module/Chat/utils";

interface Props {
  content: string;
}

const MessageBot: React.FC<Props> = ({ content }) => {
  const theme = useMantineTheme();

  const model = useAIChatStore((state) => state.model);
  console.log(model.value);

  const isReasoning = content.startsWith("<think>");

  // Process the content to handle the <thinking> tags
  const { visibleContent, thinkContent } = useMemo(() => {
    if (!isReasoning) return { visibleContent: content, thinkContent: "" };

    // Match content inside <thinking> tags
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);

    // Extract thinking content if found
    const thinkContent = thinkMatch ? thinkMatch[1].trim() : null;

    // Remove the <thinking> section from the visible content
    const visibleContent = content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    return { visibleContent, thinkContent };
  }, [content]);

  return (
    <Flex className={classes.message_bot} direction="column">
      <Flex className={classes.message_header}>
        <Flex align="center" gap="sm">
          {getAIChatModelIcon(model.value, 26)}

          <Text>{model.label}</Text>
        </Flex>
      </Flex>

      <Flex className={classes.message_wrapper} direction="column">
        {isReasoning && (
          <Accordion className={classes.thinking_container} variant="separated" mt="md">
            <Accordion.Item value="photos">
              <Accordion.Control
                icon={
                  thinkContent ? (
                    <IconBulb style={getIconStyle(26)} color={theme.colors.blue[6]} />
                  ) : (
                    <Loader size={26} />
                  )
                }
              >
                Thinking
              </Accordion.Control>
              <Accordion.Panel>
                <pre className={classes.thinking_content}>
                  {thinkContent ? thinkContent : visibleContent}
                </pre>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
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
          {isReasoning ? (thinkContent ? visibleContent : "") : content}
        </ReactMarkdown>
      </Flex>
    </Flex>
  );
};

export default MessageBot;
