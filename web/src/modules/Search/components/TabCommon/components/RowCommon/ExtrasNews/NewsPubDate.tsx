import { Flex, Text } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
  publishedDate: string | undefined;
}

const NewsPubDate: React.FC<Props> = ({ publishedDate }) => {
  return (
    <Flex align='center' mb={4}>
      <IconClock style={getIconStyle(18)} />

      <Text size='sm' ml={6}>
        {dayjs(publishedDate).fromNow()}
      </Text>
    </Flex>
  );
};

export default NewsPubDate;
