import { Container } from '@mantine/core';
import SearchBox from './components/SearchBox';
import usePrivacyScanSWR from 'src/api/privacyScan/use-privacy-scan-query';

const PagePrivacyScore = () => {
  const { data, trigger, isMutating } = usePrivacyScanSWR();

  return (
    <Container size='lg' py={80}>
      <SearchBox isLoading={isMutating} trigger={trigger} />
    </Container>
  );
};

export default PagePrivacyScore;
