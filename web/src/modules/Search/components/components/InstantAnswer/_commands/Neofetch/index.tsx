import { ColorSwatch, Flex, Text, useMantineTheme } from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import { type OS, useMounted, useOs } from "@mantine/hooks";
import { SYSTEM_ART, getBrowserLabel, getOsLabel } from "./utils";
import classes from "./styles.module.scss";

const OS_ART_COLORED: { [key in OS]: string } = {
  linux: SYSTEM_ART.linux
    .replace(/(\#)/g, '<span style="color: #495057;">$1</span>')
    .replace(/(\.)/g, '<span style="color: #f8f9fa;">$1</span>')
    .replace(/(\&)/g, '<span style="color: #ffec99;">$1</span>'),
  android: "Android",
  ios: "iOS",
  macos: SYSTEM_ART.macos,

  undetermined: "Undetermined :(",
  windows: SYSTEM_ART.windows.replace(/(\#)/g, '<span style="color: #4dabf7;">$1</span>'),
};

const IANeofetch = () => {
  const theme = useMantineTheme();

  const os = useOs();

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <IAWrapper
      className={classes.ia_neofetch}
      label={
        <Text c="dimmed" size="sm">
          This is a command like instant answer
        </Text>
      }
    >
      <Flex align="flex-start" gap="xl">
        <Text className={classes.os_art} dangerouslySetInnerHTML={{ __html: OS_ART_COLORED[os] }} />

        <Flex className={classes.device_info} direction="column">
          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              System:
            </Text>

            <Text fz={15}>{getOsLabel()}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Browser:
            </Text>

            <Text fz={15}>{getBrowserLabel()}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Viewport:
            </Text>

            <Text fz={15}>
              {window.innerWidth} x {window.innerHeight}
            </Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Language:
            </Text>

            <Text fz={15}>{navigator.language}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Time Zone:
            </Text>

            <Text fz={15}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Orientation:
            </Text>

            <Text fz={15}>{screen.orientation.type}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Color Depth:
            </Text>

            <Text fz={15}> {screen.colorDepth}</Text>
          </Flex>

          <Flex align="center" gap="sm">
            <Text fz={15} c="yellow.3" fw="bold">
              Pixel Depth:
            </Text>

            <Text fz={15}>{screen.pixelDepth}</Text>
          </Flex>

          <Flex mt="sm">
            <ColorSwatch
              color={theme.black}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.red["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.green["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.yellow["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.blue["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.grape["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.colors.cyan["6"]}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
            <ColorSwatch
              color={theme.white}
              className={classes.color_swatch}
              radius={0}
              withShadow={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </IAWrapper>
  );
};

export default IANeofetch;
