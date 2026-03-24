import { Button, Flex, Paper, Stack, Text, TextInput } from "@mantine/core";
import SettingsTitle from "../../common/SettingsTitle";
import DocsCodeHighlight from "@module/Docs/components/common/DocsCodeHighlight/DocsCodeHighlight";
import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import { decompressSearxngHash } from "./utils";
import useToast from "@hooks/use-toast";

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

const Values = () => {
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
        // icon={<IconSettings2 color={theme.colors.blue["5"]} />}
        title="pages.settings.general.title"
      />

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Text>All saved cookies:</Text>
        <DocsCodeHighlight
          className={classes.cookie_box}
          code={cookieValue ? formatCookiesToText(cookieValue) : "Loading cookies..."}
          language="json"
        />

        <Flex className={classes.load_wrapper} align="flex-end" gap="md">
          <TextInput
            className={classes.load_input}
            label="SearXNG preferrences hash"
            value={searXNGHash}
            onChange={(e) => setSearXNGHash(e.currentTarget.value)}
          />

          <Button onClick={handleSearXNGHash} disabled={!searXNGHash}>
            Load Preferrences
          </Button>
        </Flex>

        <Text mt="md">Use this to load settings from existing SearXNG preferrences hash</Text>
        <Text>Note: this might overwrite your current settings</Text>
      </Stack>
    </Paper>
  );
};

export default Values;
