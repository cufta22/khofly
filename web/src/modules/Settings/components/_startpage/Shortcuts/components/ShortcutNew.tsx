import { Flex, Modal, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import classes from "./styles.module.scss";
import { useDisclosure } from "@mantine/hooks";

import ShortcutEdit from "@module/Index/components/Shortcuts/components/ShortcutEdit";

const ShortcutNew = () => {
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex
        className={classes.add_new}
        align="center"
        justify="center"
        w={90}
        h={120}
        onClick={open}
      >
        <IconPlus style={getIconStyle(32)} color={theme.colors.green["5"]} />
      </Flex>

      <Modal opened={opened} onClose={close} title="Add shortcut">
        <ShortcutEdit
          toggleModal={close}
          shortcut={{
            title: "",
            href: "",
            imgUrl: "",
          }}
          idx={0}
          type="add"
        />
      </Modal>
    </>
  );
};

export default ShortcutNew;
