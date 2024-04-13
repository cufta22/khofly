import { Alert, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBrandNodejs, IconCode } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { useClientServerState } from "@store/client-server";
import { useRouteLoaderData } from "@remix-run/react";
import { getIconStyle } from "@utils/functions/iconStyle";

export const regions: Record<string, string> = {
  sfo1: "San Francisco",
  iad1: "Washington, D.C.",
  pdx1: "Portland",
  cle1: "Cleveland",
  gru1: "São Paulo",
  hkg1: "Hong Kong",
  hnd1: "Tokyo",
  icn1: "Seoul",
  kix1: "Osaka",
  sin1: "Singapore",
  bom1: "Mumbai",
  syd1: "Sydney",
  cdg1: "Paris",
  arn1: "Stockholm",
  dub1: "Dublin",
  lhr1: "London",
  fra1: "Frankfurt",
  cpt1: "Cape Town",
  dev1: "localhost",
};

const DevInterface = () => {
  const theme = useMantineTheme();

  const { nodeVersion, vercelRegion } = useRouteLoaderData<any>("root");

  return (
    <Alert
      variant="light"
      color="dark"
      title="Dev Interface"
      icon={<IconCode />}
      className={classes.dev_interface}
    >
      <Stack>
        {vercelRegion && vercelRegion !== "/" && (
          <Text size="sm">Vercel Region: {regions[vercelRegion]}</Text>
        )}
        {nodeVersion && nodeVersion !== "/" && (
          <Flex align="center" gap="sm">
            <IconBrandNodejs
              style={getIconStyle(22)}
              color={theme.colors.green["5"]}
            />
            <Text size="sm">{nodeVersion}</Text>
          </Flex>
        )}
      </Stack>
    </Alert>
  );
};

export default DevInterface;
