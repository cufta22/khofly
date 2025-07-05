import useForm from "@hooks/use-form";
import { Button, Center, Flex, Image, Paper, TextInput } from "@mantine/core";
import { IShortcut, useStatrpageStore } from "@store/startpage";
import React from "react";
import { createNewItem, updateItemInList } from "./utils";

interface EditShortcut extends IShortcut {
  itemIdx?: number;
}

interface Props {
  toggleModal: () => void;
  shortcut: EditShortcut;
  idx: number;
  type: "edit" | "add";
}

const ShortcutEdit: React.FC<Props> = ({ toggleModal, shortcut, idx, type }) => {
  const shortcuts = useStatrpageStore((state) => state.shortcuts);
  const setShortcuts = useStatrpageStore((state) => state.setShortcuts);

  const isEditGroup = shortcut.items.length > 0 && type === "edit";

  const form = useForm({
    initialValues: {
      title: shortcut.title,
      href: shortcut?.href || "",
      imgUrl: shortcut?.imgUrl || "",
    },
    validate: {
      title: (value) => (value.length > 0 ? null : "Invalid Title"),
      href: (value) =>
        /^(?:(ftp|http|https):\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^ "]*)?$/.test(value) ||
        isEditGroup
          ? null
          : "Invalid URL",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(shortcut.type);
    console.log(type);

    let newShortcuts: IShortcut[] = [...shortcuts]; // Start with a copy

    if (shortcut.type === "item" && shortcut.itemIdx === undefined) {
      // Scenario 1: Add/Edit a top-level item
      console.log("Add/Edit single item/group");
      if (type === "edit") {
        newShortcuts = updateItemInList(shortcuts, idx, values);
      } else {
        // type === "add"
        newShortcuts.push(createNewItem(values));
      }
    } else if (
      shortcut.type === "group" &&
      shortcut.title.length &&
      shortcut.itemIdx === undefined
    ) {
      // Scenario 2: Edit a group
      console.log("Edit group");
      if (type === "edit") {
        newShortcuts = updateItemInList(shortcuts, idx, values);
      }
    } else if (shortcut.type === "item" && shortcut.itemIdx !== undefined) {
      // Scenario 3: Edit an item within a group
      console.log("Edit an item in the group");
      if (type === "edit") {
        newShortcuts = shortcuts.map((sc, i) => {
          if (i === idx) {
            const updatedGroupItems = sc.items
              ? updateItemInList(sc.items, shortcut.itemIdx!, values)
              : [];
            return { ...sc, items: updatedGroupItems };
          }
          return sc;
        });
      }
    } else if (shortcut.type === "group") {
      console.log("WE IN??");

      // Scenario 4: Add an item to an existing group
      if (type === "add") {
        console.log("WE IN?");

        newShortcuts = shortcuts.map((sc, i) => {
          if (i === idx) {
            return {
              ...sc,
              items: [...(sc.items || []), createNewItem(values)],
            };
          }
          return sc;
        });
      }
    }

    console.log("WE OUT??");

    setShortcuts(newShortcuts);

    form.reset();

    toggleModal();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Title" placeholder="YouTube" mb="sm" {...form.getInputProps("title")} />

      {!isEditGroup && (
        <TextInput label="URL" placeholder="youtube.com" mb="lg" {...form.getInputProps("href")} />
      )}

      {!isEditGroup && (
        <Flex gap="md">
          <TextInput
            label="Custom image URL"
            description="optional"
            placeholder=""
            mb="lg"
            style={{ flexGrow: 1 }}
            {...form.getInputProps("imgUrl")}
          />

          <Paper w={80} h={80} withBorder>
            <Center h="100%">
              {/^(ftp|http|https):\/\/[^ "]+$/.test(form.values.imgUrl) && (
                <Image w={60} h={60} radius="sm" src={form.values.imgUrl} />
              )}
            </Center>
          </Paper>
        </Flex>
      )}

      <Flex justify="flex-end">
        <Button type="submit">{type === "edit" ? "Edit" : "Add"}</Button>
      </Flex>
    </form>
  );
};

export default ShortcutEdit;
