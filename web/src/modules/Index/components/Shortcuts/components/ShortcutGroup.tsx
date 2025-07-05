import { Anchor, Flex, Image, Modal, SimpleGrid, Text, UnstyledButton } from "@mantine/core";

import classes from "../styles.module.scss";

import { useClickOutside, useDisclosure, useHover } from "@mantine/hooks";
import type { IShortcut } from "@store/startpage";
import ShortcutEdit from "./ShortcutEdit";
import ShortcutMenu from "./ShortcutMenu";
import { useFaviconAPI } from "src/api/favicon";
import clsx from "clsx";
import ShortcutGroupMenu from "./ShortcutGroupMenu";
import React, { useState } from "react";

interface Props extends IShortcut {
  idx: number;
}
export interface GroupEditItem extends IShortcut {
  itemIdx?: number;
}

const ShortcutGroup: React.FC<Props> = ({ title, items, idx }) => {
  const { getFaviconUrl } = useFaviconAPI();

  const [editItem, setEditItem] = useState<GroupEditItem | null>(null);

  const [openMenu, { toggle: toggleMenu }] = useDisclosure(false);
  const [openModal, { toggle: toggleModal }] = useDisclosure(false);
  const [isExpanded, { toggle: toggleExpand, close: closeExpand }] = useDisclosure(false);

  const { hovered, ref: hoverRef } = useHover();
  const outsideRef = useClickOutside(() => closeExpand());

  return (
    <>
      <Flex ref={hoverRef} className={classes.group_container} direction="column">
        {!isExpanded && (
          <ShortcutGroupMenu
            hovered={hovered}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            toggleModal={toggleModal}
            items={items || []}
            setEditItem={(item: GroupEditItem) => setEditItem(item)}
            idx={idx}
          />
        )}

        <UnstyledButton
          ref={outsideRef}
          className={clsx(classes.item, classes.group, { [classes.group_expanded]: isExpanded })}
          onClick={toggleExpand}
        >
          <SimpleGrid cols={items.length === 1 ? 1 : 2}>
            {items?.map((shotrcut, i) => {
              const { href, imgUrl } = shotrcut;
              const fullUrl = href?.includes("https") ? href : `https://${href}`;
              const stripUrl = href?.replace(/^(?:https?:\/\/)?(.*?)(\/)?$/, "$1");

              return isExpanded ? (
                <Anchor
                  key={i}
                  href={fullUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  pos="relative"
                >
                  <Image
                    className={classes.group_image}
                    src={imgUrl ? imgUrl : getFaviconUrl(stripUrl || "", "favicone")}
                    alt="Shortcut icon"
                    radius="sm"
                  />
                </Anchor>
              ) : (
                <Image
                  key={i}
                  className={classes.group_image}
                  src={imgUrl ? imgUrl : getFaviconUrl(stripUrl || "", "favicone")}
                  alt="Shortcut icon"
                  radius="sm"
                />
              );
            })}
          </SimpleGrid>
        </UnstyledButton>

        <Text size="sm" fw="bold" mt={8} ta="center" truncate="end">
          {title}
        </Text>
      </Flex>

      {editItem && (
        <Modal
          opened={openModal}
          onClose={toggleModal}
          title={
            editItem.items.length > 0 && editItem.title
              ? "Edit group"
              : editItem.type === "item"
              ? "Edit shortcut"
              : "Add shortcut"
          }
        >
          <ShortcutEdit
            toggleModal={toggleModal}
            shortcut={editItem}
            idx={idx}
            type={
              editItem.items.length > 0 && editItem.title
                ? "edit"
                : editItem.type === "item"
                ? "edit"
                : "add"
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ShortcutGroup;
