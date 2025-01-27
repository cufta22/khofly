import { Alert, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBrandNodejs, IconCode } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useGeneralStore } from "@store/general";
import { regions } from "./utils";

const DevInterface = () => {
  const theme = useMantineTheme();

  const platformVariables = {
    // Platform variables
    nodeVersion: typeof process !== "undefined" ? process?.versions?.node : "",
    // Vercel stuff
    vercelRegion: process.env.VERCEL_REGION || "",
    // Fly.io stuff
    flyAppName: process.env.FLY_APP_NAME,
    flyRegion: process.env.FLY_REGION,
    flyMachineId: process.env.FLY_MACHINE_ID,
    // Cloudflare stuff
    // TODO: add cf stuff like region, etc. from context
  };

  const devMode = useGeneralStore((state) => state.devMode);

  if (!devMode) return null;

  return (
    <Alert
      variant="light"
      color="blue"
      title="Dev Interface"
      icon={<IconCode />}
      className={classes.dev_interface}
    >
      <Stack>
        {platformVariables.nodeVersion && (
          <Flex align="center" gap="sm">
            <IconBrandNodejs style={getIconStyle(18)} color={theme.colors.green["5"]} />
            <Text size="xs">{platformVariables.nodeVersion}</Text>
          </Flex>
        )}
        {platformVariables.vercelRegion && (
          <Text size="xs">Vercel Region: {regions[platformVariables?.vercelRegion]}</Text>
        )}
        {platformVariables.flyAppName && (
          <Text size="xs">Fly.io App Name: {platformVariables.flyAppName}</Text>
        )}
        {platformVariables.flyRegion && (
          <Text size="xs">Fly.io Region: {platformVariables.flyRegion}</Text>
        )}{" "}
        {platformVariables.flyMachineId && (
          <Text size="xs">Fly.io Machine ID: {platformVariables.flyMachineId}</Text>
        )}
      </Stack>
    </Alert>
  );
};

export default DevInterface;
