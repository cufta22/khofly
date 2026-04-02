import { Code, Container, useMantineTheme } from '@mantine/core';

import DocsTitle from './common/DocsTitle';
import DocsSubtitle from './common/DocsSubtitle';

import { IconMessageCode } from '@tabler/icons-react';
import DocsText from './common/DocsText';
import DocsNextPrev from './common/DocsNextPrev';

import { DOCS_CARD_DATA } from './common/docsCardData';

import IAGallery from './components/search-instant-answer/IAGallery';

const DocsSearchInstantAnswer = () => {
  const theme = useMantineTheme();

  const IAWrapperString = '<IAWrapper />';

  return (
    <Container size='lg' p='xl' pb={100}>
      <DocsTitle leftSection={<IconMessageCode color={theme.colors.grape[5]} />}>
        Instant Answers
      </DocsTitle>

      <DocsText>
        Instant Answers (IA) provide a better user experience by providing direct information
        without the need for user to click on any result. This feature can easily be disabled in
        settings.
      </DocsText>

      <DocsSubtitle>Adding instant answer</DocsSubtitle>

      <DocsText>
        All instant answers code is located in{' '}
        <Code>/src/modules/Search/components/components/InstantAnswer</Code>
      </DocsText>

      <DocsText>
        Create a folder with a descriptive name and make sure that everything is wrapped with{' '}
        <Code>{IAWrapperString}</Code>, then add your logic for displaying Instant Answer in{' '}
        <Code>index.tsx</Code> similar to how others are displayed conditionally.
      </DocsText>

      <DocsSubtitle>All available instant answers</DocsSubtitle>

      <DocsText>
        Below is a list of all currently available Instant Answers, some of them might still be work
        in progress but offer enough functionality to still be included and be useful. More will be
        available in the future.
      </DocsText>

      {/* Display all IAs */}
      <IAGallery />

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)['syntax'] }}
        next={{ ...DOCS_CARD_DATA(theme)['AI'] }}
      />
    </Container>
  );
};

export default DocsSearchInstantAnswer;
