import { Button, Flex, Paper, Stack, Text, TextInput } from "@mantine/core";

import { IconDevices, IconPhoto } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";

import { useStatrpageStore } from "@store/startpage";
import SettingsTitle from "../../common/SettingsTitle";
import useForm from "@hooks/use-form";
import useToast from "@hooks/use-toast";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { useEffect } from "react";

const SettingsWallpaper = () => {
  const background = useStatrpageStore((state) => state.wallpaper);
  const setBackground = useStatrpageStore((state) => state.setWallpaper);

  const form = useForm({
    initialValues: {
      background: "",
    },
    // validate: {
    //   background: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL"),
    // },
  });

  const { toast } = useToast();

  const linkTextColor = usePrimaryColor(4);

  const handleSubmit = (values: typeof form.values) => {
    setBackground(values.background);
    toast.show({ message: "URL changed!", color: "green" });
  };

  useEffect(() => {
    form.setFieldValue("background", background);
  }, [background]);

  return (
    <Paper radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SettingsTitle
          icon={<IconPhoto />}
          title="pages.settings.startpage.title_background"
          rightSection={
            <Flex className="desktop_only" align="center">
              <IconDevices />

              <Text ml="sm">Desktop & Mobile</Text>
            </Flex>
          }
        />

        {/* Settings content */}
        <Stack w="100%" align="start" px="lg" mb="xl">
          {/* <SettingsRow
          // icon={null}
          desc="pages.settings.startpage.toggle_shortcuts"
          control={<ShortcutsSwitch />}
        />

        <Divider my="sm" w="100%" /> */}

          <TextInput
            label="Wallpaper URL"
            placeholder="https://example.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("background")}
          />
        </Stack>

        <Flex
          align="center"
          justify="space-between"
          py="sm"
          px="lg"
          className={classes.settings_footer}
        >
          <div />

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsWallpaper;
