import { ActionIcon, rem } from "@mantine/core";
import { IconFilter, IconListDetails } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import classes from "../styles.module.scss";
import QuickSettings from "@module/Search/components/components/QuickSettings";
import { useDisclosure } from "@mantine/hooks";

const HeaderOrganize = () => {
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
        <IconListDetails style={getIconStyle(24)} />
      </ActionIcon>

      <QuickSettings isOpen={opened} onClose={close} />
    </>
  );
};

export default HeaderOrganize;
