import {
  Anchor,
  Button,
  Flex,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandCloudflare } from "@tabler/icons-react";

import classes from "../../../styles.module.scss";
import useToast from "@hooks/use-toast";
import { useInstanceStore } from "@store/instance";
import useForm from "@hooks/use-form";
import React, { useEffect } from "react";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import SettingsTitle from "../../common/SettingsTitle";
import { IOpenSection } from "@module/SettingsMobile";
import SettingsMTitle from "@module/SettingsMobile/components/common/SettingsTitle";

interface Props {
  isM?: boolean;
  handleChangeSection?: (next: IOpenSection) => void;
}

const SettingsAIWorker: React.FC<Props> = ({ isM, handleChangeSection }) => {
  const theme = useMantineTheme();

  const hydrated = useInstanceStore((state) => state.hydrated);
  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const setWorkerDomain = useInstanceStore((state) => state.setWorkerDomain);

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
    toast.show({ message: "URL changed", color: "green" });
  };

  useEffect(() => {
    if (hydrated && !form.values.domain) {
      form.setFieldValue("domain", workerDomain);
    }
  }, [hydrated]);

  return (
    <>
      {isM && handleChangeSection && (
        <SettingsMTitle
          title="pages.settings.instances.title_ai"
          handleChangeSection={handleChangeSection}
        />
      )}

      <Paper radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isM && (
            <SettingsTitle
              icon={<IconBrandCloudflare color={theme.colors.orange["5"]} />}
              title="pages.settings.instances.title_ai"
            />
          )}

          {/* Settings content */}
          <Stack px="lg" mb="xl" mt={isM ? "lg" : 0}>
            <TextInput
              placeholder="https://example.com"
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
              are used in AI Chat and to display AI Answers in /search. Click read more below to
              learn how to set up your own worker.
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
              <RemixLink to={"/docs/self-host-cf-workers"}>
                <Text component="span" c={linkTextColor}>
                  Read more
                </Text>
              </RemixLink>
            </Text>

            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Paper>
    </>
  );
};

export default SettingsAIWorker;
