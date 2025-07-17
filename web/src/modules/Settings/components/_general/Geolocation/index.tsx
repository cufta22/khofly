import { Button, Flex, Paper, Stack, Text, TextInput } from "@mantine/core";
import SettingsTitle from "../../common/SettingsTitle";
import classes from "../../../styles.module.scss";
import useForm from "@hooks/use-form";

const SettingsGeolocation = () => {
  const form = useForm({
    initialValues: {
      lat: "",
      lon: "",
    },
    validate: {
      lat: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : "Invalid value"),
      lon: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : "Invalid value"),
    },
  });

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle
        // icon={<IconSettings2 color={theme.colors.blue["5"]} />}
        title="pages.settings.geolocation.title"
      />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex align="flex-end" gap="md">
          <TextInput label="Latitude" placeholder="00.0000000" />

          <TextInput label="Longitude" placeholder="00.0000000" />

          <Button type="submit">Use Nominatim</Button>
        </Flex>

        <Text size="sm" c="dimmed">
          If you don't want to use your browsers default Geolocation API ( probably uses Google ),
          you can manually input your lat & lon or use Nominatim to find it for you.
        </Text>
      </Stack>

      <Flex
        align="center"
        justify="space-between"
        py="sm"
        px="lg"
        className={classes.settings_footer}
      >
        <Text size="sm" c="dimmed">
          This will get cached in local storage so you only need to set this up once.
        </Text>

        <Button type="submit">Save</Button>
      </Flex>
    </Paper>
  );
};

export default SettingsGeolocation;
