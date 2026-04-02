import { usePrimaryColor } from '@hooks/use-primary-color';
import { Flex, Table, Text } from '@mantine/core';
import SearchAnchor from '@module/Search/components/components/SearchAnchor';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
  // docker-hub, github, npm
  publishedDate?: string;
  package_name?: string;
  maintainer?: string;
  tags?: Array<string>;
  popularity?: string | number;

  // github
  license_name?: string;
  license_url?: string;
  homepage?: string;
  source_code_url?: string;

  // npm
  version?: string;
}

const ITDetails: React.FC<Props> = ({
  homepage,
  license_name,
  license_url,
  maintainer,
  package_name,
  popularity,
  publishedDate,
  source_code_url,
  tags,
  version,
}) => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <Table withRowBorders={false} verticalSpacing={2} mt='sm'>
      {/* <Table.Thead></Table.Thead> */}
      <Table.Tbody>
        {package_name && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Name:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{package_name}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {version && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Version:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{version}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {maintainer && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Maintainer:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{maintainer}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {publishedDate && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Updated at:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{dayjs(publishedDate).format('MMM D, YYYY')}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {tags && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Tags:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{tags.join(', ')}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {!!popularity && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Popularity:</Text>
            </Table.Td>
            <Table.Td>
              <Text size='xs'>{popularity}</Text>
            </Table.Td>
          </Table.Tr>
        )}

        {license_name && license_url && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Licence:</Text>
            </Table.Td>
            <Table.Td>
              <SearchAnchor url={license_url} updateVisited={false}>
                <Text c={linkTextColor} size='xs'>
                  {license_name}
                </Text>
              </SearchAnchor>
            </Table.Td>
          </Table.Tr>
        )}

        {homepage && source_code_url && (
          <Table.Tr>
            <Table.Td w={100}>
              <Text size='xs'>Project:</Text>
            </Table.Td>
            <Table.Td>
              <Flex align='center' gap='xs'>
                <SearchAnchor url={homepage}>
                  <Text c={linkTextColor} size='xs'>
                    Project homepage
                  </Text>
                </SearchAnchor>
                <Text size='xs'>|</Text>
                <SearchAnchor url={source_code_url}>
                  <Text c={linkTextColor} size='xs'>
                    Project source code
                  </Text>
                </SearchAnchor>
              </Flex>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default ITDetails;
