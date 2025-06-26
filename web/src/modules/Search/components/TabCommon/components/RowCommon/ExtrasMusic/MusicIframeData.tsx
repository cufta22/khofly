import { Button, Flex, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Dispatch, SetStateAction } from "react";
dayjs.extend(relativeTime);

interface Props {
  iframeOpen: boolean;
  publishedDate: string | undefined;
  setIframeOpen: Dispatch<SetStateAction<boolean>>;
}

const MusicIframeData: React.FC<Props> = ({ iframeOpen, publishedDate, setIframeOpen }) => {
  return (
    <Flex align="center" mt="xs" justify="space-between">
      {/* Date */}
      <Flex align="center">
        {publishedDate && (
          <>
            <IconCalendar style={getIconStyle(18)} />

            <Text size="sm" ml={6}>
              {dayjs(publishedDate).format("MMM D, YYYY")}
            </Text>
          </>
        )}
      </Flex>

      <Button
        variant="light"
        size="xs"
        w={100}
        onClick={(e) => {
          e.preventDefault();
          setIframeOpen((prev) => !prev);
        }}
      >
        {iframeOpen ? "Hide media" : "Show media"}
      </Button>
    </Flex>
  );
};

export default MusicIframeData;
