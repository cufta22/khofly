import { useTranslate } from "@hooks/translate/use-translate";
import { Center, Container, Loader, Table, Title } from "@mantine/core";
import type { ILoaderData_Instances } from "app/routes/instances";

interface Props {
  loaderData: ILoaderData_Instances;
}

const PageInstances: React.FC<Props> = ({ loaderData }) => {
  const t = useTranslate();
  console.log(loaderData.data);

  if (!loaderData.data)
    return (
      <Center mt={100}>
        <Loader size="xl" />
      </Center>
    );

  return (
    <Container size="lg" py="xl" pt={40} pb={40}>
      <Title ta="center" mt="md" mb="xl">
        {t("pages.instances.title")}
      </Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>Version</Table.Th>
            {/* <Table.Th>TLS</Table.Th> */}
            <Table.Th>CSP</Table.Th>
            <Table.Th>HTML</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loaderData?.data?.instances?.map((item) => (
            <Table.Tr key={item.url}>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.url}</Table.Td>
              <Table.Td>{item.version}</Table.Td>
              <Table.Td>{item.csp}</Table.Td>
              <Table.Td>{item.html}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default PageInstances;
