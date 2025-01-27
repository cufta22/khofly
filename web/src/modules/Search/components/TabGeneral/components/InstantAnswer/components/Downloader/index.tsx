import React, { useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  Button,
  Center,
  Flex,
  MantineTheme,
  Paper,
  ScrollArea,
  SegmentedControl,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import classes from "./styles.module.scss";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

type DownloadType = "youtube" | "tiktok" | "instagram";

const getDownloadOptions = (theme: MantineTheme) => ({
  youtube: {
    label: "YouTube",
    value: "youtube",
    icon: (
      <IconBrandYoutube
        style={getIconStyle(20)}
        color={theme.colors.red["6"]}
      />
    ),
  },
  tiktok: {
    label: "TikTok",
    value: "tiktok",
    icon: <IconBrandTiktok style={getIconStyle(20)} />,
  },
  instagram: {
    label: "Instagram",
    value: "instagram",
    icon: (
      <IconBrandInstagram
        style={getIconStyle(20)}
        color={theme.colors.pink["6"]}
      />
    ),
  },
});

const IADownloader = () => {
  const theme = useMantineTheme();
  const [type, setType] = useState("youtube");

  const DOWNLOAD_OPTIONS = getDownloadOptions(theme);

  return (
    <IAWrapper>
      <Center>
        <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
          <ScrollArea type="never">
            <SegmentedControl
              fullWidth
              mb="md"
              value={type}
              onChange={(val) => val && setType(val as DownloadType)}
              data={Object.keys(DOWNLOAD_OPTIONS).map((val) => ({
                // label: DOWNLOAD_OPTIONS[val as DownloadType].label,
                label: (
                  <Flex align="center" justify="center" gap="xs">
                    {DOWNLOAD_OPTIONS[val as DownloadType].icon}
                    <span>{DOWNLOAD_OPTIONS[val as DownloadType].label}</span>
                  </Flex>
                ),
                value: DOWNLOAD_OPTIONS[val as DownloadType].value,
              }))}
            />
          </ScrollArea>

          <TextInput label="Media URL" />

          <Button mt="md">Download</Button>
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default IADownloader;
