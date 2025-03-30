import { Flex, Modal, Text, UnstyledButton } from "@mantine/core";

import classes from "../styles.module.scss";

import { useDisclosure } from "@mantine/hooks";
import ShortcutEdit from "./ShortcutEdit";

import { IconPlus } from "@tabler/icons-react";
import clsx from "clsx";
import { getIconStyle } from "@utils/functions/iconStyle";

const ShortcutNew = () => {
  const [openModal, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex direction="column">
        <UnstyledButton className={clsx(classes.item, classes.item_new)} onClick={open}>
          <IconPlus style={getIconStyle(38)} />
        </UnstyledButton>

        <Text size="sm" fw="bold" mt={8} ta="center" truncate="end">
          Add New
        </Text>
      </Flex>

      <Modal opened={openModal} onClose={close} title="Add shortcut">
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
