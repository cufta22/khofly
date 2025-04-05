import { Flex } from "@mantine/core";
import classes from "./styles.module.scss";

interface Props {
  content: string;
}

const MessageUser: React.FC<Props> = ({ content }) => {
  return (
    <Flex className={classes.message_user}>
      <Flex className={classes.message_wrapper}>{content}</Flex>
    </Flex>
  );
};

export default MessageUser;
