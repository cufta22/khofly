import RemixLink from "@components/RemixLink";
import { Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const HeaderIndexChat = () => {
  return (
    <RemixLink to={"/chat"}>
      <Button
        leftSection={<IconMessage style={getIconStyle(24)} />}
        color="pink.5"
        variant="subtle"
      >
        Chat
      </Button>
    </RemixLink>
  );
};

export default HeaderIndexChat;
