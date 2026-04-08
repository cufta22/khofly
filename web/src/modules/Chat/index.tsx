import { Container, Flex, LoadingOverlay } from '@mantine/core';
import ChatInput from './components/ChatInput';
import classes from './styles.module.scss';
import ChatMessages from './components/ChatMessages';
import useAIConfigSWR from 'src/api/ai/use-ai-config-query';
import { useAIChatStore } from '@store/aichat';
import { getAIChatModelSource } from './utils';
import { profanityFilter } from '@utils/functions/profanityFilter';
import type { IAIChatMessage } from '@ts/chat.types';
import useAICommonAPI from 'src/api/ai/use-ai-common-api';

const PageChat = () => {
  const { isLoading: isLoadingConfig } = useAIConfigSWR();

  const model = useAIChatStore((state) => state.model);
  const temperature = useAIChatStore((state) => state.temperature);
  const maxTokens = useAIChatStore((state) => state.maxTokens);
  const systemInstruction = useAIChatStore((state) => state.systemInstruction);
  const stopStreamToChat = useAIChatStore((state) => state.stopStreamToChat);
  const streamToChat = useAIChatStore((state) => state.streamToChat);

  const {
    trigger: triggerChat,
    isLoading: isLoadingChat,
    stopStreaming,
  } = useAICommonAPI({
    variant: 'ai-chat',
    temperature,
    maxTokens,
    systemInstruction,
    handleUpdateStream: (val) => streamToChat({ content: val, isGenerating: true }),
    handleDONE: stopStreamToChat,
  });

  const chat = useAIChatStore((state) => state.chat);
  const addToChat = useAIChatStore((state) => state.addToChat);

  const handleAskQuestion = (input: string) => {
    if (!model.value) return;

    const messages: IAIChatMessage[] = [
      ...chat,
      { role: 'user', content: profanityFilter(input), isGenerating: false },
    ];

    addToChat([
      { role: 'user', content: profanityFilter(input), isGenerating: false },
      { role: 'assistant', content: '', isGenerating: true },
    ]);

    triggerChat({
      model: model.value,
      messages,
      source: getAIChatModelSource(model.value),
    });
  };

  return (
    <Container className={classes.chat_page} size='lg'>
      <Flex className={classes.inner} direction='column' justify='space-between'>
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
