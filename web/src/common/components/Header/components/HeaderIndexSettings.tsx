import { ActionIcon, rem } from "@mantine/core";
import { IconSettings2 } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import classes from "../styles.module.scss";
import CustomizeSettings from "@module/Index/components/CustomizeSettings";
import { useDisclosure } from "@mantine/hooks";

const HeaderIndexSettings = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon
        className={classes.action_button}
        variant="subtle"
        size={rem(36)}
        ml="md"
        onClick={open}
      >
        <IconSettings2 style={getIconStyle(24)} />
      </ActionIcon>

      <CustomizeSettings isOpen={opened} onClose={close} />
    </>
  );
};

export default HeaderIndexSettings;
