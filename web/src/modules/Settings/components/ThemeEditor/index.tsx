import {
  Anchor,
  Button,
  CloseButton,
  DEFAULT_THEME,
  Flex,
  JsonInput,
  Paper,
  Stack,
  Text,
} from "@mantine/core";

import { IconCheck, IconMinus, IconPalette, IconPlus } from "@tabler/icons-react";

import { useTranslate } from "@hooks/translate/use-translate";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { THEME_CATPPUCCIN } from "@utils/resources/themes/catppuccin";
import { useClientServerState } from "@store/client-server";
import useToast from "@hooks/use-toast";
import { setCookie } from "@utils/functions/cookies";
import { useMounted } from "@mantine/hooks";
import ExternalLink from "@components/ExternalLink";

interface Props {
  setDisplayThemeEdit: Dispatch<SetStateAction<boolean>>;
}

const SettingsThemeEditor: React.FC<Props> = ({ setDisplayThemeEdit }) => {
  const t = useTranslate();
  const mounted = useMounted();

  const [themeJson, setThemeJson] = useState("");

  const { toast } = useToast();

  const { setTheme } = useClientServerState();

  const handleApply = () => {
    try {
      // try to parse it for validation
      JSON.parse(themeJson);

      // Set theme in LS
      localStorage.setItem("custom-theme-json", themeJson);

      // Set theme in context
      setTheme("Custom");

      // Set theme in cookie ( for persistance )
      setCookie("khofly-app-theme", "Custom", {
        expires: 60 * 60 * 24 * 90, // ~ 90 days
        path: "/",
        domain: process.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
        secure: process.env.HOST?.includes("https"),
        sameSite: "Strict",
      });
    } catch (error) {
      toast.show({ message: "Invalid JSON string", color: "red" });
    }
  };

  // Set value initially
  useEffect(() => {
    if (mounted) {
      const lsThemeJson = localStorage.getItem("custom-theme-json");

      if (lsThemeJson) {
        setThemeJson(lsThemeJson);
      }
    }
  }, [mounted]);

  return (
    <Paper radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16} justify="space-between">
        <IconPalette size={32} />

        <Text fz={26} fw={600} ml="sm">
          {t("pages.settings.theme.title")}
        </Text>

        <div style={{ flex: 1 }} />

        <CloseButton
          size="lg"
          onClick={() => {
            setDisplayThemeEdit(false);
          }}
        />
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" align="center">
          <Button
            leftSection={<IconPlus style={getIconStyle(16)} />}
            onClick={() => setThemeJson(JSON.stringify(DEFAULT_THEME, null, 4))}
            size="xs"
            variant="light"
            mr="md"
          >
            Full theme
          </Button>

          <Button
            leftSection={<IconPlus style={getIconStyle(16)} />}
            onClick={() => setThemeJson(JSON.stringify(THEME_CATPPUCCIN, null, 4))}
            size="xs"
            variant="light"
            mr="md"
          >
            Basic theme
          </Button>

          <Button
            leftSection={<IconMinus style={getIconStyle(16)} />}
            onClick={() => setThemeJson("")}
            size="xs"
            variant="light"
            mr="md"
          >
            Clear
          </Button>

          <div style={{ flexGrow: 1 }} />

          <Button
            leftSection={<IconCheck style={getIconStyle(16)} />}
            onClick={() => handleApply()}
            size="xs"
            variant="filled"
          >
            Apply theme
          </Button>
        </Flex>

        <JsonInput
          placeholder="{ ..."
          validationError="Invalid JSON"
          formatOnBlur
          w="100%"
          minRows={10}
          rows={20}
          value={themeJson}
          onChange={(val) => setThemeJson(val)}
        />

        <Text>
          Edit this only if you know what you're doing,{" "}
          <ExternalLink href="https://mantine.dev/theming/theme-object/">
            link to theme docs.
          </ExternalLink>
        </Text>
      </Stack>
    </Paper>
  );
};

export default SettingsThemeEditor;
