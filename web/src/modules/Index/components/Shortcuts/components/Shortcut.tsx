import { Anchor, Image, Modal, Text, UnstyledButton } from "@mantine/core";

import classes from "../styles.module.scss";

import { useDisclosure, useHover } from "@mantine/hooks";
import type { IShortcut } from "@store/startpage";
import ShortcutEdit from "./ShortcutEdit";
import ShortcutMenu from "./ShortcutMenu";
import { useFaviconAPI } from "src/api/favicon";

interface Props extends IShortcut {
  idx: number;
}

const Shortcut: React.FC<Props> = ({ href, title, imgUrl, idx }) => {
  const { getFaviconUrl } = useFaviconAPI();

  const { hovered, ref } = useHover<HTMLAnchorElement>();

  const [openMenu, { toggle: toggleMenu }] = useDisclosure(false);
  const [openModal, { toggle: toggleModal }] = useDisclosure(false);

  const fullUrl = href.includes("https") ? href : `https://${href}`;
  const stripUrl = href.replace(/^(?:https?:\/\/)?(.*?)(\/)?$/, "$1");

  return (
    <>
      <Anchor ref={ref} href={fullUrl} target="_blank" rel="noreferrer noopener" pos="relative">
        <ShortcutMenu
          fullUrl={fullUrl}
          hovered={hovered}
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          toggleModal={toggleModal}
          idx={idx}
        />

        <UnstyledButton className={classes.item}>
          <Image
            className={classes.item_image}
            src={imgUrl ? imgUrl : getFaviconUrl(stripUrl, "favicone")}
            alt="Shortcut icon"
            radius="sm"
          />
        </UnstyledButton>

        <Text size="sm" fw="bold" mt={8} ta="center" truncate="end">
          {title}
        </Text>
      </Anchor>

      <Modal opened={openModal} onClose={toggleModal} title="Edit shortcut">
        <ShortcutEdit
          toggleModal={toggleModal}
          shortcut={{
            title,
            href,
            imgUrl,
          }}
          idx={idx}
          type="edit"
        />
      </Modal>
    </>
  );
};

export default Shortcut;
