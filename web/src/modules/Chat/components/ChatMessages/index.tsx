import { Flex, ScrollArea, Space } from "@mantine/core";
import MessageUser from "./components/MessageUser";
import MessageBot from "./components/MessageBot";

import classes from "./styles.module.scss";

import type { IAIChatMessage } from "@ts/chat.types";

interface Props {
  messages: IAIChatMessage[];
  streamData: string;
  isLoadingChat: boolean;
}

const ChatMessages: React.FC<Props> = ({ messages, streamData, isLoadingChat }) => {
  return (
    <ScrollArea className={classes.scroll_area}>
      <Flex className={classes.messages} direction="column">
        <Space h={20} />

        {messages.map((item, i) => {
          if (item.role === "user") {
            return <MessageUser key={i} content={item.content} />;
          } else {
            return <MessageBot key={i} content={item.content} />;
          }
        })}

        {isLoadingChat && <MessageBot content={streamData} />}

        <Space h={40} />
      </Flex>
    </ScrollArea>
  );
};

export default ChatMessages;
