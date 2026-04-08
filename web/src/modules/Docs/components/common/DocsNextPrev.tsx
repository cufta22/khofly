import { Grid, Space } from '@mantine/core';
import type { DocsCardProps } from './DocsCard';
import DocsCard from './DocsCard';
import DocsSubtitle from './DocsSubtitle';

interface Props {
  prev: DocsCardProps;
  next: DocsCardProps;
}

const DocsNextPrev: React.FC<Props> = ({ prev, next }) => {
  return (
    <>
      <Space h={40} />
      <DocsSubtitle>Read more</DocsSubtitle>

      <Grid gap='lg' mt={30}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard
            href={prev.href}
            icon={prev.icon}
            title={prev.title}
            description={prev.description}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DocsCard
            href={next.href}
            icon={next.icon}
            title={next.title}
            description={next.description}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default DocsNextPrev;
