import useForm from "@hooks/use-form";
import { Button, Center, Flex, Image, Paper, TextInput } from "@mantine/core";
import { IShortcut, useStatrpageStore } from "@store/startpage";
import React from "react";

interface Props {
  toggleModal: () => void;
  shortcut: IShortcut;
  idx: number;
}

const ShortcutEdit: React.FC<Props> = ({ toggleModal, shortcut, idx }) => {
  const shortcuts = useStatrpageStore((state) => state.shortcuts);
  const setShortcuts = useStatrpageStore((state) => state.setShortcuts);

  const form = useForm({
    initialValues: {
      title: shortcut.title,
      href: shortcut.href,
      imgUrl: shortcut.imgUrl || "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const newShortcuts = [...shortcuts].map((val, i) => (i === idx ? { ...values } : val));
    setShortcuts(newShortcuts);

    form.reset();

    toggleModal();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Title" placeholder="YouTube" mb="sm" {...form.getInputProps("title")} />

      <TextInput label="URL" placeholder="youtube.com" mb="lg" {...form.getInputProps("href")} />

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

      <Flex justify="flex-end">
        <Button type="submit">Edit</Button>
      </Flex>
    </form>
  );
};

export default ShortcutEdit;
