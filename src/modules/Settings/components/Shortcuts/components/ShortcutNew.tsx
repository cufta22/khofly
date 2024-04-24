import { Button, Flex, Modal, TextInput, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import classes from "./styles.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSettingsStore } from "@store/settings";

const ShortcutNew = () => {
  const theme = useMantineTheme();

  const { shortcuts, setShortcuts } = useSettingsStore((state) => ({
    shortcuts: state.shortcuts,
    setShortcuts: state.setShortcuts,
  }));

  const [opened, { open, close }] = useDisclosure(false);

  const [title, setTitle] = useState("");
  const [href, setHref] = useState("");

  const handleAdd = () => {
    setShortcuts([
      ...shortcuts,
      {
        title,
        href,
      },
    ]);

    close();
  };

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
        {/* Modal content */}

        <TextInput
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          label="Title"
          placeholder="YouTube"
          mb="sm"
        />

        <TextInput
          value={href}
          onChange={(e) => setHref(e.currentTarget.value)}
          label="URL"
          placeholder="youtube.com"
          mb="lg"
        />

        <Flex justify="flex-end">
          <Button onClick={handleAdd}>Add</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ShortcutNew;
