import { Anchor, Button, Flex, Kbd, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconCalendar, IconMagnet } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

dayjs.extend(relativeTime);

const formatBytes = (bytes: string | number) => {
  // TODO: add spacing between 12MB if doesn't exist
  if (typeof bytes === "string") return bytes;

  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

interface Props {
  magnetlink: string | undefined;
  seed: string | undefined;
  leech: string | undefined;
  filesize: number | undefined;
  publishedDate: string | undefined;
}

const FilesDetails: React.FC<Props> = ({ publishedDate, filesize, leech, magnetlink, seed }) => {
  return (
    <>
      <Flex align="center">
        {publishedDate && (
          <>
            <IconCalendar style={getIconStyle(18)} />

            <Text size="sm" ml={6}>
              {dayjs(publishedDate).format("MMM D, YYYY")}
            </Text>
          </>
        )}

        {filesize && (
          <Text size="xs" ml="md">
            <Kbd>{formatBytes(filesize)}</Kbd>
          </Text>
        )}
      </Flex>

      <Flex align="center" mt="xs" justify="space-between">
        {seed && seed !== "N/A" && leech && leech !== "N/A" ? (
          <Text size="xs" mt="xs">
            <Kbd>Seed {seed}</Kbd> • <Kbd>Leech {leech}</Kbd>
          </Text>
        ) : (
          <div></div>
        )}

        {magnetlink && (
          <Anchor href={magnetlink} target="_blank" rel="noreferrer noopener">
            <Button variant="light" size="xs" leftSection={<IconMagnet style={getIconStyle(18)} />}>
              Magnet link
            </Button>
          </Anchor>
        )}
      </Flex>
    </>
  );
};

export default FilesDetails;
