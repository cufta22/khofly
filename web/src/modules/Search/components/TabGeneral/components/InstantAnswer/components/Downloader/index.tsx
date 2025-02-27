import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  Button,
  Center,
  Flex,
  type MantineTheme,
  Paper,
  ScrollArea,
  SegmentedControl,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import classes from "./styles.module.scss";
import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { isValidURL } from "@utils/functions/isValidURL";
import useToast from "@hooks/use-toast";

// "youtube" | "tiktok" | "instagram"
type DownloadType = "youtube";

const getDownloadOptions = (theme: MantineTheme) => ({
  youtube: {
    label: "YouTube",
    value: "youtube",
    icon: <IconBrandYoutube style={getIconStyle(20)} color={theme.colors.red["6"]} />,
  },
  // tiktok: {
  //   label: "TikTok",
  //   value: "tiktok",
  //   icon: <IconBrandTiktok style={getIconStyle(20)} />,
  // },
  // instagram: {
  //   label: "Instagram",
  //   value: "instagram",
  //   icon: <IconBrandInstagram style={getIconStyle(20)} color={theme.colors.pink["6"]} />,
  // },
});

const IADownloader = () => {
  const theme = useMantineTheme();
  const [from, setFrom] = useState("youtube");
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("");

  const { toast } = useToast();

  const DOWNLOAD_OPTIONS = getDownloadOptions(theme);

  const handleDownload = () => {
    if (!isValidURL(url)) {
      toast.show({ message: "Invalid URL", color: "red" });
      return;
    }

    fetch(`http://localhost:4000/download?url=${url}&from=youtube`);
  };

  useEffect(() => {
    const defaultFormat = from === "youtube" ? "mp4" : "";
    setFormat(defaultFormat);
  }, [from]);

  return (
    <IAWrapper>
      <Center>
        <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
          <ScrollArea type="never">
            <SegmentedControl
              fullWidth
              mb="md"
              value={from}
              onChange={(val) => val && setFrom(val as DownloadType)}
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

          <TextInput
            label="Media URL"
            placeholder={from === "youtube" ? "https://www.youtube.com?watch=..." : ""}
            value={url}
            onChange={(e) => {
              setUrl(e.currentTarget.value);
            }}
          />

          <Flex justify="space-between" align="flex-end">
            <Button mt="md" onClick={handleDownload}>
              Download
            </Button>

            {["youtube"].includes(from) && (
              <Select
                size="sm"
                value={format}
                onChange={(val) => val && setFormat(val)}
                data={[
                  { value: "mp3", label: "mp3" },
                  { value: "mp4", label: "mp4" },
                ]}
              />
            )}
          </Flex>
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default IADownloader;
