import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  type SelectProps,
} from "@mantine/core";

import classes from "../../../styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import useToast from "@hooks/use-toast";
import RemixLink from "@components/RemixLink";
import { IWeatherSource, useInstanceStore } from "@store/instance";
import { IconApiApp } from "@tabler/icons-react";
import { useEffect } from "react";
import { DEFlag, USFlag } from "@components/Icons/Flags";
import useForm from "@hooks/use-form";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

const SettingsAPI = () => {
  const domain = useInstanceStore((state) => state.apiDomain);
  const setDomain = useInstanceStore((state) => state.setApiDomain);

  const weatherSource = useInstanceStore((state) => state.weatherSource);
  const setWeatherSource = useInstanceStore((state) => state.setWeatherSource);

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
    toast.show({ message: "URL changed!", color: "green" });
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
    <Paper radius="md" withBorder mt={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="center" p="lg" mb={16}>
          <IconApiApp style={getIconStyle(32)} />

          <Text fz={26} fw={600} ml="sm">
            API Domain
          </Text>
        </Flex>

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <TextInput
            placeholder="https://example.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("domain")}
          />

          {!IS_SELF_HOST && (
            <Select
              className={classes.settings_select}
              label="Weather data source"
              description="Pick one based on accuracy"
              placeholder="Weather data source"
              value={weatherSource}
              onChange={(val) => {
                setWeatherSource(val as IWeatherSource);
              }}
              data={[
                {
                  label: "OpenWeather",
                  value: "owm",
                },
                {
                  label: "Open-Meteo",
                  value: "om",
                },
              ]}
              renderOption={renderSelectOption}
              // leftSection={icons[form.values.select]}
            />
          )}
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
              <RemixLink to={"/docs/self-host-searxng"}>Read more</RemixLink>
            </Text>
          </Text>

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsAPI;
