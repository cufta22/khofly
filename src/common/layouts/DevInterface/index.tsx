import { Alert, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBrandNodejs, IconCode } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { useRouteLoaderData } from "@remix-run/react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useGeneralStore } from "@store/general";
import { RootLoaderData } from "@ts/global.types";
import { regions } from "./utils";

const DevInterface = () => {
  const theme = useMantineTheme();

  const { nodeVersion, vercelRegion, flyAppName, flyRegion, flyMachineId } =
    useRouteLoaderData<RootLoaderData>("root");

  const { devMode } = useGeneralStore((state) => ({
    devMode: state.devMode,
  }));

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
        {nodeVersion && (
          <Flex align="center" gap="sm">
            <IconBrandNodejs
              style={getIconStyle(18)}
              color={theme.colors.green["5"]}
            />
            <Text size="xs">{nodeVersion}</Text>
          </Flex>
        )}
        {vercelRegion && (
          <Text size="xs">Vercel Region: {regions[vercelRegion]}</Text>
        )}
        {flyAppName && <Text size="xs">Fly.io App Name: {flyAppName}</Text>}
        {flyRegion && <Text size="xs">Fly.io Region: {flyRegion}</Text>}{" "}
        {flyMachineId && (
          <Text size="xs">Fly.io Machine ID: {flyMachineId}</Text>
        )}
      </Stack>
    </Alert>
  );
};

export default DevInterface;
