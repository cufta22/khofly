import {
  Anchor,
  Button,
  Flex,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";

import classes from "../../styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import useToast from "@hooks/use-toast";
import { useInstanceStore } from "@store/instance";
import useForm from "@hooks/use-form";

const SettingsNominatim = () => {
  const { domain, setDomain } = useInstanceStore((state) => ({
    domain: state.nominatimDomain,
    setDomain: state.setNominatimDomain,
  }));

  const form = useForm({
    initialValues: {
      domain: domain,
    },
    validate: {
      domain: (value) =>
        /^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL",
    },
  });

  const { toast } = useToast();

  const handleSubmit = (values: typeof form.values) => {
    setDomain(values.domain);
    toast.show({ message: "URL changed!", color: "green" });
  };

  return (
    <Paper radius="md" mt={40} withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="center" p="lg" mb={16}>
          <IconWorld style={getIconStyle(32)} />

          <Text fz={26} fw={600} ml="sm">
            Nominatim Domain
          </Text>
        </Flex>

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <Text size="sm">
            <Text component="span" c="blue.4">
              <Anchor
                href="https://nominatim.org/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Nominatim
              </Anchor>
            </Text>{" "}
            uses OpenStreetMap data to find locations on Earth by name and
            address (geocoding).
          </Text>

          <TextInput
            placeholder="domain.com"
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
            Change this to your own url for better privacy & less load for
            default instance.{" "}
            <Text component="span" c="blue">
              <Anchor
                href="https://nominatim.org/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Read more
              </Anchor>
            </Text>
          </Text>

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsNominatim;
