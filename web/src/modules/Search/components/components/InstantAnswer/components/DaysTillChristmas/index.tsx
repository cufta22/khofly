import { IconChristmasBall, IconChristmasTree } from '@tabler/icons-react';
import { IAWrapper } from '../../wrapper';
import { Flex, Text, useMantineTheme } from '@mantine/core';
import ExternalLink from '@components/Links/ExternalLink';

const IADaysTillChristmas = () => {
  const theme = useMantineTheme();

  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 25);

  // If Christmas has already passed this year, set the target for next year
  if (now.getMonth() === 11 && now.getDate() > 25) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }

  // Difference in milliseconds
  const diffMs = christmas.getTime() - now.getTime();

  // Convert milliseconds to days, hours, and minutes
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const timeTillChristmas = `${days} Days, ${hours} Hours, ${minutes} Minutes`;

  return (
    <IAWrapper
      label={
        <Text size='sm' c='dimmed'>
          Days till christmas
        </Text>
      }
    >
      <Flex align='center' gap='sm'>
        <IconChristmasTree color={theme.colors.green['4']} />
        <Text size='xl' fw={500}>
          {timeTillChristmas}
        </Text>
      </Flex>

      <Text size='sm' mt='md' c='dimmed'>
        May be off by an hour because of{' '}
        <ExternalLink href='https://www.timeanddate.com/time/dst/about.html'>DST</ExternalLink> :(
      </Text>
    </IAWrapper>
  );
};

export default IADaysTillChristmas;
