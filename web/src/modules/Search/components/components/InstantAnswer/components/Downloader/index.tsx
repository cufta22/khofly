import { useEffect, useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  Button,
  Center,
  Flex,
  LoadingOverlay,
  type MantineTheme,
  Paper,
  ScrollArea,
  SegmentedControl,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import classes from "./styles.module.scss";
import { IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { isValidURL } from "@utils/functions/isValidURL";
import useToast from "@hooks/use-toast";
import useDownloadSWR from "src/api/download/use-download-query";

type DownloadFrom = "youtube" | "instagram"; // | "tiktok";

type DownloadFormat = "mp3" | "mp4";

const getDownloadOptions = (theme: MantineTheme) => ({
  youtube: {
    label: "YouTube",
    value: "youtube",
    icon: <IconBrandYoutube style={getIconStyle(20)} color={theme.colors.red["6"]} />,
  },
  instagram: {
    label: "Instagram",
    value: "instagram",
    icon: <IconBrandInstagram style={getIconStyle(20)} color={theme.colors.pink["6"]} />,
  },
  // tiktok: {
  //   label: "TikTok",
  //   value: "tiktok",
  //   icon: <IconBrandTiktok style={getIconStyle(20)} />,
  // },
});

const IADownloader = () => {
  const { data, trigger, isMutating } = useDownloadSWR({ shouldDownload: true });
  const theme = useMantineTheme();

  const [url, setUrl] = useState("");
  const [from, setFrom] = useState<DownloadFrom>("youtube");
  const [format, setFormat] = useState<DownloadFormat>("mp4");

  const { toast } = useToast();

  const DOWNLOAD_OPTIONS = getDownloadOptions(theme);

  const handleDownload = () => {
    if (!isValidURL(url)) {
      toast.show({ message: "Invalid URL", color: "red" });
      return;
    }

    trigger({
      format,
      from,
      url,
    });
  };

  useEffect(() => {
    // Clear URL when changing from
    setUrl("");

    const defaultFormat = from === "youtube" ? "mp4" : "mp4";
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
              onChange={(val) => val && setFrom(val as DownloadFrom)}
              data={Object.keys(DOWNLOAD_OPTIONS).map((val) => ({
                label: (
                  <Flex align="center" justify="center" gap="xs">
                    {DOWNLOAD_OPTIONS[val as DownloadFrom].icon}
                    <span>{DOWNLOAD_OPTIONS[val as DownloadFrom].label}</span>
                  </Flex>
                ),
                value: DOWNLOAD_OPTIONS[val as DownloadFrom].value,
              }))}
            />
          </ScrollArea>

          <TextInput
            label="Media URL"
            placeholder={
              from === "youtube"
                ? "https://www.youtube.com/watch?v=..."
                : from === "instagram"
                ? "https://www.instagram.com/..."
                : ""
            }
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
                onChange={(val) => val && setFormat(val as DownloadFormat)}
                data={[
                  { value: "mp3", label: "mp3" },
                  { value: "mp4", label: "mp4" },
                ]}
                withCheckIcon
                checkIconPosition="right"
              />
            )}
          </Flex>

          <LoadingOverlay visible={isMutating} />
        </Paper>
      </Center>
    </IAWrapper>
  );
};

export default IADownloader;
