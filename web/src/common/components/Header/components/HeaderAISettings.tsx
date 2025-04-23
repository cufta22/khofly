import { ActionIcon, rem } from "@mantine/core";
import { IconSettings2 } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useDisclosure } from "@mantine/hooks";
import AISettings from "@module/Chat/components/AISettings";

const HeaderAISettings = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        variant="subtle"
        size={rem(36)}
        // ml="md"
        onClick={open}
      >
        <IconSettings2 style={getIconStyle(24)} />
      </ActionIcon>

      <AISettings isOpen={opened} onClose={close} />
    </>
  );
};

export default HeaderAISettings;
