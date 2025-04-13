import { Flex, ScrollArea, Space } from "@mantine/core";
import MessageUser from "./components/MessageUser";
import MessageBot from "./components/MessageBot";

import classes from "./styles.module.scss";
import { useAIChatStore } from "@store/aichat";

// interface Props {}

const ChatMessages = () => {
  const messages = useAIChatStore((state) => state.chat);

  return (
    <ScrollArea className={classes.scroll_area} type="never">
      <Flex className={classes.messages} direction="column">
        <Space h={20} />
        <Space h={70} />

        {messages.map((item, i) => {
          if (item.role === "user") {
            return <MessageUser key={i} content={item.content} />;
          } else {
            return <MessageBot key={i} content={item.content} />;
          }
        })}

        {/* {isLoadingChat && <MessageBot content={streamData} />} */}

        <Space h={70} />
      </Flex>
    </ScrollArea>
  );
};

export default ChatMessages;
