import {
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  type SelectProps,
} from "@mantine/core";

import classes from "../../../styles.module.scss";
import useToast from "@hooks/use-toast";
import RemixLink from "@components/RemixLink";
import { useInstanceStore } from "@store/instance";
import { IconAppWindow } from "@tabler/icons-react";
import { useEffect } from "react";
// import { DEFlag, USFlag } from "@components/Icons/Flags";
import useForm from "@hooks/use-form";
import { usePrimaryColor } from "@hooks/use-primary-color";
import SettingsTitle from "../../common/SettingsTitle";

const SettingsPV = () => {
  const theme = useMantineTheme();

  const domain = useInstanceStore((state) => state.pvDomain);
  const setDomain = useInstanceStore((state) => state.setPvDomain);

  const form = useForm({
    initialValues: {
      domain: "",
    },
    validate: {
      domain: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL"),
    },
  });

  const { toast } = useToast();

  const linkTextColor = usePrimaryColor(4);

  const handleSubmit = (values: typeof form.values) => {
    setDomain(values.domain);
    toast.show({ message: "URL changed", color: "green" });
  };

  useEffect(() => {
    form.setFieldValue("domain", domain);
  }, [domain]);

  // const icons: Record<string, React.ReactNode> = {
  //   [process.env.SEARXNG_URL_EU1 || ""]: <DEFlag style={getIconStyle(20)} />,
  //   // [process.env.SEARXNG_URL_US1]: <USFlag style={getIconStyle(20)} />,
  // };

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      {/* {icons[option.value]} */}
      {option.label}
    </Group>
  );

  return (
    <Paper radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SettingsTitle
          icon={<IconAppWindow color={theme.colors.indigo["5"]} />}
          title="pages.settings.instances.title_pv"
        />

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <TextInput
            placeholder="https://example.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("domain")}
          />
        </Stack>

        <Flex
          align="center"
          justify="space-between"
          py="sm"
          px="lg"
          className={classes.settings_footer}
        >
          <Text size="sm" c="dimmed">
            Change this to your own url for better privacy & less load for default instance.{" "}
            <Text component="span" c={linkTextColor}>
              <RemixLink to={"/docs/self-host-khofly-pv"}>Read more</RemixLink>
            </Text>
          </Text>

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsPV;
