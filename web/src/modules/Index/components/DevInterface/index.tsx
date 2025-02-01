import { Alert, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBrandNodejs, IconCode } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useGeneralStore } from "@store/general";
import { regions } from "./utils";
import { ILoaderData_Index } from "app/routes/_index";

interface Props {
  loaderData: ILoaderData_Index;
}

const DevInterface: React.FC<Props> = ({ loaderData }) => {
  const theme = useMantineTheme();

  const {
    // Platform variables
    nodeVersion,
    // Vercel stuff
    vercelRegion,
    // Fly.io stuff
    flyAppName,
    flyRegion,
    flyMachineId,
    // Cloudflare stuff
    // TODO: add cf stuff like region, etc. from context
  } = loaderData;

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
        {nodeVersion && (
          <Flex align="center" gap="sm">
            <IconBrandNodejs style={getIconStyle(18)} color={theme.colors.green["5"]} />
            <Text size="xs">{nodeVersion}</Text>
          </Flex>
        )}
        {vercelRegion && <Text size="xs">Vercel Region: {regions[vercelRegion]}</Text>}
        {flyAppName && <Text size="xs">Fly.io App Name: {flyAppName}</Text>}
        {flyRegion && <Text size="xs">Fly.io Region: {flyRegion}</Text>}{" "}
        {flyMachineId && <Text size="xs">Fly.io Machine ID: {flyMachineId}</Text>}
      </Stack>
    </Alert>
  );
};

export default DevInterface;
