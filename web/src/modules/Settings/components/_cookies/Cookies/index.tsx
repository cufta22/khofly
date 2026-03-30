import { Button, Flex, Paper, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import SettingsTitle from "../../common/SettingsTitle";
import DocsCodeHighlight from "@module/Docs/components/common/DocsCodeHighlight/DocsCodeHighlight";
import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import { decompressSearxngHash } from "./utils";
import useToast from "@hooks/use-toast";
import { IconCookie } from "@tabler/icons-react";
import { useTranslate } from "@hooks/translate/use-translate";

const formatCookiesToText = (cookieString: string): string => {
  return cookieString
    .split("; ") // 1. Split into individual cookies
    .map((cookie) => {
      const [name, value] = cookie.split("=");
      try {
        // 2. Decode URL characters (%7B -> {)
        const decodedValue = decodeURIComponent(value);
        // 3. Parse JSON string into an Object
        const parsedObject = JSON.parse(decodedValue);
        // 4. Pretty-print with 2-space indentation
        const formattedJson = JSON.stringify(parsedObject?.state, null, 2);

        return `Cookie: ${name} \n${formattedJson}`;
      } catch (e) {
        // Fallback if a cookie isn't valid JSON
        return `Cookie: ${name} \n"${value}"`;
      }
    })
    .join("\n\n"); // 5. Join all cookies with double spacing
};

const Cookies = () => {
  const t = useTranslate();
  const theme = useMantineTheme();

  const { toast } = useToast();

  const [cookieValue, setCookieValue] = useState<string>("");
  const [searXNGHash, setSearXNGHash] = useState<string>("");

  const handleSearXNGHash = async () => {
    const hashJson = await decompressSearxngHash(searXNGHash);

    if (!hashJson.isValid) {
      toast.show({ title: "Something went wrong", message: "Invalid SearXNG hash!", color: "red" });
      return;
    }

    // Set zustand values
    console.log(hashJson);
  };

  useEffect(() => {
    // This code ONLY runs in the browser
    setCookieValue(document.cookie || "");
  }, []);

  return (
    <Paper radius="md" withBorder>
      <SettingsTitle
        icon={<IconCookie color={theme.colors.yellow["5"]} />}
        title="pages.settings.cookies.title"
      />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Text>{t("pages.settings.cookies.all_saved")}</Text>
        <DocsCodeHighlight
          className={classes.cookie_box}
          code={cookieValue ? formatCookiesToText(cookieValue) : "Loading cookies..."}
          language="json"
        />

        <Flex className={classes.load_wrapper} align="flex-end" gap="md">
          <TextInput
            className={classes.load_input}
            label={t("pages.settings.cookies.searxng_pref_hash")}
            value={searXNGHash}
            onChange={(e) => setSearXNGHash(e.currentTarget.value)}
          />

          <Button onClick={handleSearXNGHash} disabled={!searXNGHash}>
            {t("pages.settings.cookies.load_preferences")}
          </Button>
        </Flex>

        <Text mt="md">{t("pages.settings.cookies.load_hash_desc")}</Text>
        <Text>{t("pages.settings.cookies.load_hash_desc_note")}</Text>
      </Stack>
    </Paper>
  );
};

export default Cookies;
