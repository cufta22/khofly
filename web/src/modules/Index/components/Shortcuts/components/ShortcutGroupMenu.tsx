import { ActionIcon, Menu } from "@mantine/core";
import React from "react";
import classes from "../styles.module.scss";
import {
  IconDots,
  IconEdit,
  IconExternalLink,
  IconPlus,
  IconSquare,
  IconSquareOff,
  IconTrash,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { IShortcut, useHomepageStore } from "@store/homepage";
import { GroupEditItem } from "./ShortcutGroup";

interface Props {
  openMenu: boolean;
  toggleMenu: () => void;
  toggleModal: () => void;
  hovered: boolean;
  items: IShortcut["items"];
  setEditItem: (item: GroupEditItem) => void;
  idx: number;
}

const ShortcutGroupMenu: React.FC<Props> = ({
  hovered,
  openMenu,
  toggleMenu,
  toggleModal,
  items,
  setEditItem,
  idx,
}) => {
  const shortcuts = useHomepageStore((state) => state.shortcuts);
  const setShortcuts = useHomepageStore((state) => state.setShortcuts);

  // Group actions
  const handleEditGroup = () => {
    if (!items) return;

    const editGroup = shortcuts?.find((_val, i) => i === idx);
    if (!editGroup) return;

    setEditItem({
      ...editGroup,
    });
    toggleModal();
  };
  const handleDeleteGroup = () => {
    const newShortcuts = [...shortcuts].filter((_val, i) => i !== idx);
    setShortcuts(newShortcuts);

    toggleMenu();
  };
  const handleUngroup = () => {
    const newShortcuts = shortcuts.map((sc, i) => {
      if (i === idx) {
        const groupItem = sc?.items?.[0];
        return {
          type: "item",
          title: groupItem.title,
          href: groupItem.href,
          imgUrl: groupItem.imgUrl,
          items: [],
        } as IShortcut;
      } else {
        return sc;
      }
    });
    setShortcuts(newShortcuts);

    toggleMenu();
  };

  // Item actions
  const handleAddItem = () => {
    if (!items) return;

    setEditItem({
      type: "group",
      title: "",
      href: "",
      imgUrl: "",
      items: items,
    });
    toggleModal();
  };
  const handleEditItem = (editItemIdx: number) => {
    if (!items) return;

    const editItem = shortcuts
      ?.find((_val, i) => i === idx)
      ?.items?.find((_val, i) => i === editItemIdx);
    if (!editItem) return;

    setEditItem({
      ...editItem,
      itemIdx: editItemIdx,
    });
    toggleModal();
  };
  const handleDeleteItem = (editItemIdx: number) => {
    // Delete the entire group if there's only one item
    if (items.length === 1) {
      handleDeleteGroup();
      return;
    }

    const newShortcuts = [...shortcuts].map((sc, i) => {
      if (i === idx) {
        return {
          ...sc,
          items: sc?.items?.filter((_val, i) => i !== editItemIdx),
        };
      } else {
        return sc;
      }
    });

    setShortcuts(newShortcuts);
  };

  return (
    <Menu opened={openMenu} onChange={toggleMenu} shadow="md" width={200} position="bottom-start">
      <Menu.Target>
        {hovered || openMenu ? (
          <ActionIcon
            onClick={(e) => {
              e.preventDefault();

              toggleMenu();
            }}
            className={classes.group_actions}
            size="sm"
            variant="transparent"
          >
            <IconDots />
          </ActionIcon>
        ) : (
          <div></div>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {items.length < 4 && (
          <Menu.Item
            fz="xs"
            leftSection={<IconPlus style={getIconStyle(14)} />}
            onClick={handleAddItem}
          >
            Add item
          </Menu.Item>
        )}
        <Menu.Item
          fz="xs"
          leftSection={<IconEdit style={getIconStyle(14)} />}
          onClick={handleEditGroup}
        >
          Edit Group
        </Menu.Item>
        <Menu.Item
          fz="xs"
          leftSection={<IconTrash style={getIconStyle(14)} />}
          color="red"
          onClick={handleDeleteGroup}
        >
          Delete Group
        </Menu.Item>

        {items.length === 1 && (
          <Menu.Item
            fz="xs"
            leftSection={<IconSquareOff style={getIconStyle(14)} />}
            onClick={handleUngroup}
          >
            Ungroup
          </Menu.Item>
        )}

        <Menu.Divider />

        {items?.map((sc, i) => (
          <Menu.Sub key={i}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>{sc.title}</Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              <Menu.Item
                fz="xs"
                leftSection={<IconEdit style={getIconStyle(14)} />}
                onClick={() => handleEditItem(i)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                fz="xs"
                leftSection={<IconTrash style={getIconStyle(14)} />}
                color="red"
                onClick={() => handleDeleteItem(i)}
              >
                Delete
              </Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ShortcutGroupMenu;
