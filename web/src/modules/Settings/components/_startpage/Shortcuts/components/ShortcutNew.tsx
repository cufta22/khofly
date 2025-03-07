import {
  Button,
  Center,
  Flex,
  Image,
  Modal,
  Paper,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import classes from "./styles.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { useStatrpageStore } from "@store/startpage";
import useForm from "@hooks/use-form";

const ShortcutNew = () => {
  const theme = useMantineTheme();

  const shortcuts = useStatrpageStore((state) => state.shortcuts);
  const setShortcuts = useStatrpageStore((state) => state.setShortcuts);

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
      href: "",
      imgUrl: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setShortcuts([
      ...shortcuts,
      {
        title: values.title,
        href: values.href,
        imgUrl: values.imgUrl,
      },
    ]);

    form.reset();

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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Title" placeholder="YouTube" mb="sm" {...form.getInputProps("title")} />

          <TextInput
            label="URL"
            placeholder="youtube.com"
            mb="lg"
            {...form.getInputProps("href")}
          />

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
            <Button type="submit">Add</Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default ShortcutNew;
