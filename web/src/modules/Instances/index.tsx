import { useTranslate } from "@hooks/translate/use-translate";
import { Center, Container, Loader, Table, Title } from "@mantine/core";
import type { ILoaderData_Instances } from "app/routes/instances";

interface Props {
  loaderData: ILoaderData_Instances;
}

const PageInstances: React.FC<Props> = ({ loaderData }) => {
  const t = useTranslate();

  if (!loaderData.data)
    return (
      <Center mt={100}>
        <Loader size="xl" />
      </Center>
    );

  return (
    <Container size="lg" py="xl" pt={40} pb={40}>
      <Title ta="center" mt="md" mb="xl">
        {t("pages.changelog.title")}
      </Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Instance name</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>val 1</Table.Th>
            <Table.Th>val 2</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loaderData?.data?.instances.map((element) => (
            <Table.Tr key={element.name}>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.url}</Table.Td>
              <Table.Td>123</Table.Td>
              <Table.Td>456</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default PageInstances;
