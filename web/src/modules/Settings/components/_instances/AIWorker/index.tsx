import {
  Anchor,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Select,
  type SelectProps,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";
import useToast from "@hooks/use-toast";
import { type IWorkerModels, useInstanceStore } from "@store/instance";
import useForm from "@hooks/use-form";
import { useEffect } from "react";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { WORKER_MODELS_DATA } from "./data";
import SettingsTitle from "../../common/SettingsTitle";

const SettingsAIWorker = () => {
  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const setWorkerDomain = useInstanceStore((state) => state.setWorkerDomain);
  const workerModel = useInstanceStore((state) => state.workerModel);
  const setWorkerModel = useInstanceStore((state) => state.setWorkerModel);

  const theme = useMantineTheme();
  const linkTextColor = usePrimaryColor(4);

  const form = useForm({
    initialValues: {
      domain: workerDomain,
    },
    validate: {
      domain: (value) => (/^(ftp|http|https):\/\/[^ "]+$/.test(value) ? null : "Invalid URL"),
    },
  });

  const { toast } = useToast();

  const handleSubmit = (values: typeof form.values) => {
    setWorkerDomain(values.domain);
    toast.show({ message: "URL changed!", color: "green" });
  };

  useEffect(() => {
    if (hydrated && !form.values.domain) {
      form.setFieldValue("domain", workerDomain);
    }
  }, [hydrated]);

  const getIcon = (label: string) => {
    if (label.includes("llama-") || label.includes("m2m100")) {
      return <Image src="/assets/engines/meta-icon.svg" fit="contain" w={16} h={16} />;
    }

    if (label.includes("gemma-")) {
      return <Image src="/assets/engines/google-icon.svg" w={16} h={16} />;
    }
    if (label.includes("mistral-")) {
      return <Image src="/assets/engines/mistral-icon.svg" w={16} h={16} />;
    }
  };

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      {getIcon(option.label)}
      {option.label}
    </Group>
  );

  return (
    <Paper radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SettingsTitle icon={<IconSparkles />} title="pages.settings.instances.title_ai" />

        {/* Settings content */}
        <Stack px="lg" mb="xl">
          <TextInput
            placeholder="https://example.com"
            size="md"
            className={classes.settings_input}
            {...form.getInputProps("domain")}
          />

          <Select
            className={classes.settings_select}
            label="CF Worker model"
            // description=""
            placeholder="CF Worker model"
            value={workerModel}
            onChange={(val) => {
              setWorkerModel(val as IWorkerModels);
            }}
            data={WORKER_MODELS_DATA}
            renderOption={renderSelectOption}
            leftSection={getIcon(workerModel)}
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
