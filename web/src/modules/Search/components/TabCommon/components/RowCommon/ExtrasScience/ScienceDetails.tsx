import { usePrimaryColor } from '@hooks/use-primary-color';
import { Button, Flex, Table, Text } from '@mantine/core';
import SearchAnchor from '@module/Search/components/components/SearchAnchor';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
  // Article data
  authors?: Array<string>;
  tags?: Array<string>;
  pdf_url?: string;
  doi?: string;
  publishedDate?: string;
  publisher?: string;
  journal?: string;
  type?: string;
  isbn?: Array<string>;
  issn?: Array<string>;
}

const ScienceDetails: React.FC<Props> = ({
  publishedDate,
  doi,
  tags,
  authors,
  pdf_url,
  journal,
  publisher,
  type,
  isbn,
  issn,
}) => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <>
      <Table withRowBorders={false} verticalSpacing={2} mt='sm'>
        {/* <Table.Thead></Table.Thead> */}
        <Table.Tbody>
          {publishedDate && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Published date:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{dayjs(publishedDate).format('MMM D, YYYY')}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {authors && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Author:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{authors.filter((a) => a !== '…').join(', ')}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {journal && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Journal:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{journal}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {publisher && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Publisher:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{publisher}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {type && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Type:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{type}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {tags && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>Tags:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{tags.join(', ')}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {doi && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>DOI:</Text>
              </Table.Td>
              <Table.Td>
                <SearchAnchor url={`https://oadoi.org/${doi}`}>
                  <Text c={linkTextColor} size='xs'>
                    {doi}
                  </Text>
                </SearchAnchor>
              </Table.Td>
            </Table.Tr>
          )}

          {isbn && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>ISBN:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{isbn.join(', ')}</Text>
              </Table.Td>
            </Table.Tr>
          )}

          {issn && (
            <Table.Tr>
              <Table.Td w={120}>
                <Text size='xs'>ISSN:</Text>
              </Table.Td>
              <Table.Td>
                <Text size='xs'>{issn.join(', ')}</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {/* Links */}
      <Flex mt='xs' gap='sm'>
        {pdf_url && (
          <SearchAnchor url={pdf_url} updateVisited={false}>
            <Button variant='default' size='xs'>
              PDF
            </Button>
          </SearchAnchor>
        )}

        {doi && (
          <SearchAnchor url={`https://www.altmetric.com/details/doi/${doi}`} updateVisited={false}>
            <Button variant='default' size='xs'>
              Altmetric
            </Button>
          </SearchAnchor>
        )}
      </Flex>
    </>
  );
};

export default ScienceDetails;
