import { Container, Flex, LoadingOverlay } from "@mantine/core";
import ChatInput from "./components/ChatInput";
import classes from "./styles.module.scss";
import ChatMessages from "./components/ChatMessages";
import useAIConfigSWR from "src/api/ai/use-ai-config-query";
import useAIChatAPI from "src/api/ai/use-ai-chat-api";
import { useAIChatStore } from "@store/aichat";
import { getAIChatModelSource } from "./utils";
import { profanityFilter } from "@utils/functions/profanityFilter";
import type { IAIChatMessage } from "@ts/chat.types";

const PageChat = () => {
  const { isLoading: isLoadingConfig } = useAIConfigSWR();
  const { trigger: triggerChat, isLoading: isLoadingChat, stopStreaming } = useAIChatAPI();

  const chat = useAIChatStore((state) => state.chat);
  const addToChat = useAIChatStore((state) => state.addToChat);

  const model = useAIChatStore((state) => state.model);

  const handleAskQuestion = async (input: string) => {
    if (!model.value) return;

    const messages: IAIChatMessage[] = [
      ...chat,
      { role: "user", content: profanityFilter(input), isGenerating: false },
    ];

    addToChat([
      { role: "user", content: profanityFilter(input), isGenerating: false },
      { role: "assistant", content: "", isGenerating: true },
    ]);

    triggerChat({
      model: model.value,
      messages,
      source: getAIChatModelSource(model.value),
    });
  };

  return (
    <Container className={classes.chat_page} size="lg">
      <Flex className={classes.inner} direction="column" justify="space-between">
        <LoadingOverlay visible={isLoadingConfig} />

        <ChatMessages />

        <ChatInput
          handleAskQuestion={handleAskQuestion}
          stopStreaming={stopStreaming}
          isLoadingChat={isLoadingChat}
        />
      </Flex>
    </Container>
  );
};

export default PageChat;
