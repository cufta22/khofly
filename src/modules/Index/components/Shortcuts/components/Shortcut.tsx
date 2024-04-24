import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  Modal,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";

import classes from "../styles.module.scss";
import {
  IconDots,
  IconEdit,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure, useHover } from "@mantine/hooks";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useSettingsStore } from "@store/settings";

interface ShortcutProps {
  title: string;
  href: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ href, title }) => {
  const { shortcuts, setShortcuts } = useSettingsStore((state) => ({
    shortcuts: state.shortcuts,
    setShortcuts: state.setShortcuts,
  }));

  const { hovered, ref } = useHover<HTMLAnchorElement>();

  const [openMenu, { toggle: toggleMenu }] = useDisclosure(false);
  const [openModal, { toggle: toggleModal }] = useDisclosure(false);

  const [editTitle, setTitle] = useState(title);
  const [editHref, setHref] = useState(href);

  const fullUrl = href.includes("https") ? href : `https://${href}`;
  const stripUrl = href.replace(/^(?:https?:\/\/)?(.*?)(\/)?$/, "$1");

  const handleEdit = () => {
    const newShortcuts = [...shortcuts].map((val) =>
      val.href === href ? { title: editTitle, href: editHref } : val
    );
    setShortcuts(newShortcuts);

    toggleModal();
  };

  const handleDelete = () => {
    const newShortcuts = [...shortcuts].filter((val) => val.href !== href);
    setShortcuts(newShortcuts);

    toggleModal();
  };

  useEffect(() => {
    fetch("/api/favicon?url=mantine.dev");
  }, []);

  return (
    <>
      <Anchor
        ref={ref}
        href={fullUrl}
        target="_blank"
        rel="noreferrer noopener"
        pos="relative"
      >
        <Menu
          opened={openMenu}
          onChange={toggleMenu}
          shadow="md"
          width={200}
          position="bottom-start"
        >
          <Menu.Target>
            <ActionIcon
              onClick={(e) => {
                e.preventDefault();

                toggleMenu();
              }}
              className={classes.item_actions}
              size="sm"
              variant="transparent"
            >
              {(hovered || openMenu) && <IconDots />}
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              fz="xs"
              leftSection={<IconEdit style={getIconStyle(14)} />}
              onClick={toggleModal}
            >
              Edit
            </Menu.Item>

            <Menu.Item
              fz="xs"
              leftSection={<IconTrash style={getIconStyle(14)} />}
              color="red"
              onClick={handleDelete}
            >
              Delete
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              fz="xs"
              leftSection={<IconExternalLink style={getIconStyle(14)} />}
              onClick={() => {
                window.open(
                  fullUrl,
                  "_blank",
                  "height=600,width=800,toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1"
                );
              }}
            >
              Open in a new window
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <UnstyledButton className={classes.item} w={90} h={90}>
          <Image
            w={40}
            h={40}
            //   src={`https://icons.duckduckgo.com/ip3/${stripUrl}.ico`}
            src={`https://favicone.com/${stripUrl}?s=64`}
            //   src={`https://www.google.com/s2/favicons?domain=${href}&sz=32`}
            // src={`${fullUrl}/favicon.ico`}
            alt=""
          />
        </UnstyledButton>

        <Box w={90}>
          <Text size="md" fw="bold" mt={8} ta="center" truncate="end">
            {title}
          </Text>
        </Box>
      </Anchor>

      <Modal opened={openModal} onClose={toggleModal} title="Edit shortcut">
        <TextInput
          value={editTitle}
          onChange={(e) => setTitle(e.currentTarget.value)}
          label="Title"
          placeholder="YouTube"
          mb="sm"
        />

        <TextInput
          value={editHref}
          onChange={(e) => setHref(e.currentTarget.value)}
          label="URL"
          placeholder="youtube.com"
          mb="lg"
        />

        <Flex justify="flex-end">
          <Button onClick={handleEdit}>Edit</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default Shortcut;
