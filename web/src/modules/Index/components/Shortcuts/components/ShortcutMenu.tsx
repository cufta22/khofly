import { ActionIcon, Menu } from "@mantine/core";
import React from "react";
import classes from "../styles.module.scss";
import { IconDots, IconEdit, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useStatrpageStore } from "@store/startpage";

interface Props {
  openMenu: boolean;
  toggleMenu: () => void;
  toggleModal: () => void;
  hovered: boolean;
  fullUrl: string;
  idx: number;
}

const ShortcutMenu: React.FC<Props> = ({
  hovered,
  openMenu,
  toggleModal,
  toggleMenu,
  fullUrl,
  idx,
}) => {
  const shortcuts = useStatrpageStore((state) => state.shortcuts);
  const setShortcuts = useStatrpageStore((state) => state.setShortcuts);

  const handleDelete = () => {
    const newShortcuts = [...shortcuts].filter((_val, i) => i !== idx);
    setShortcuts(newShortcuts);

    toggleMenu();
  };

  return (
    <Menu opened={openMenu} onChange={toggleMenu} shadow="md" width={200} position="bottom-start">
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
  );
};

export default ShortcutMenu;
