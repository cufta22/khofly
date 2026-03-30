import { Button, Flex, Paper, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";

import classes from "../../../styles.module.scss";
import useToast from "@hooks/use-toast";
import RemixLink from "@components/RemixLink";
import { useInstanceStore } from "@store/instance";
import { IconApiApp } from "@tabler/icons-react";
import React, { useEffect } from "react";
import useForm from "@hooks/use-form";
import { usePrimaryColor } from "@hooks/use-primary-color";
import SettingsTitle from "../../common/SettingsTitle";
import { IOpenSection } from "@module/SettingsMobile";
import SettingsMTitle from "@module/SettingsMobile/components/common/SettingsTitle";
import { useTranslate } from "@hooks/translate/use-translate";

interface Props {
  isM?: boolean;
  handleChangeSection?: (next: IOpenSection) => void;
}

const SettingsAPI: React.FC<Props> = ({ isM, handleChangeSection }) => {
  const t = useTranslate();
  const theme = useMantineTheme();

  const domain = useInstanceStore((state) => state.apiDomain);
  const setDomain = useInstanceStore((state) => state.setApiDomain);

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

  return (
    <>
      {isM && handleChangeSection && (
        <SettingsMTitle
          title="pages.settings.instances.title_api"
          handleChangeSection={handleChangeSection}
        />
      )}

      <Paper radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isM && (
            <SettingsTitle
              icon={<IconApiApp color={theme.colors.blue["5"]} />}
              title="pages.settings.instances.title_api"
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
          </Stack>

          <Flex
            align="center"
            justify="space-between"
            py="sm"
            px="lg"
            className={classes.settings_footer}
          >
            <Text size="sm" c="dimmed">
              {t("pages.settings.instances.change_url")}{" "}
              <Text component="span" c={linkTextColor}>
                <RemixLink to={"/docs/self-host-khofly-api"}>{t("_common.read_more")}</RemixLink>
              </Text>
            </Text>

            <Button type="submit">{t("pages.settings._common.save")}</Button>
          </Flex>
        </form>
      </Paper>
    </>
  );
};

export default SettingsAPI;
