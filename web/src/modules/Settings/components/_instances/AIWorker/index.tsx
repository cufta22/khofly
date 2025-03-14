import { Anchor, Button, Flex, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconSparkles, IconWorld } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import useToast from "@hooks/use-toast";
import { useInstanceStore } from "@store/instance";
import useForm from "@hooks/use-form";
import { useEffect } from "react";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";

const SettingsAIWorker = () => {
  const hydrated = useInstanceStore((state) => state.hydrated);
  const domain = useInstanceStore((state) => state.workerDomain);
  const setDomain = useInstanceStore((state) => state.setWorkerDomain);

  const linkTextColor = usePrimaryColor(4);

  const form = useForm({
    initialValues: {
      domain: domain,
    },
    validate: {
      domain: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL"),
    },
  });

  const { toast } = useToast();

  const handleSubmit = (values: typeof form.values) => {
    setDomain(values.domain);
    toast.show({ message: "URL changed!", color: "green" });
  };

  useEffect(() => {
    if (hydrated && !form.values.domain) {
      form.setFieldValue("domain", domain);
    }
  }, [hydrated]);

  return (
    <Paper radius="md" mt={40} withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="center" p="lg" mb={16}>
          <IconSparkles style={getIconStyle(32)} />

          <Text fz={26} fw={600} ml="sm">
            AI Worker
          </Text>
        </Flex>

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <TextInput
            placeholder="domain.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("domain")}
          />

          <Text size="sm">
            <Anchor
              href="https://developers.cloudflare.com/workers-ai/get-started/dashboard/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Text component="span" c={linkTextColor}>
                Cloudflare AI Workers
              </Text>
            </Anchor>{" "}
            are used to display AI answers in /search. Click read more below to learn how to set up
            your own worker.
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
            Change this to your own url for better privacy & less load for default instance.{" "}
            <RemixLink to={"/docs/self-host-ai-worker"}>
              <Text component="span" c={linkTextColor}>
                Read more
              </Text>
            </RemixLink>
          </Text>

          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Paper>
  );
};

export default SettingsAIWorker;
