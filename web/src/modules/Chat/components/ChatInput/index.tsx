import { ActionIcon, TextInput } from "@mantine/core";
import classes from "./styles.module.scss";
import { useState } from "react";
import { IconPlayerPause, IconSend2 } from "@tabler/icons-react";
import { useAIChatStore } from "@store/aichat";

interface Props {
  handleAskQuestion: (input: string) => void;
  stopStreaming: () => void;
  isLoadingChat: boolean;
}

const ChatInput: React.FC<Props> = ({ handleAskQuestion, stopStreaming, isLoadingChat }) => {
  const model = useAIChatStore((state) => state.model);

  const [val, setVal] = useState<string>("");

  return (
    <TextInput
      size="lg"
      placeholder="Ask anything..."
      value={val}
      onChange={(e) => setVal(e.currentTarget.value)}
      classNames={{ root: classes.chat_input }}
      disabled={!model.value}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (!model.value || isLoadingChat) return;
          setVal("");
          handleAskQuestion(val);
        }
      }}
      rightSection={
        <ActionIcon
          variant="subtle"
          size="xl"
          onClick={() => {
            if (isLoadingChat) {
              stopStreaming();
            } else {
              if (!model.value) return;
              setVal("");
              handleAskQuestion(val);
            }
          }}
          color={isLoadingChat ? "red" : "blue"}
          // disabled={isLoadingChat || !model.value}
        >
          {isLoadingChat ? <IconPlayerPause /> : <IconSend2 />}
        </ActionIcon>
      }
    />
  );
};

export default ChatInput;
