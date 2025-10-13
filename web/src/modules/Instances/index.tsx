import { useTranslate } from "@hooks/translate/use-translate";
import { usePrimaryColor } from "@hooks/use-primary-color";
import { Anchor, Badge, Center, Container, Loader, Table, Text, Title } from "@mantine/core";
import type { ILoaderData_Instances } from "app/routes/instances";

interface Props {
  loaderData: ILoaderData_Instances;
}

const getCspColor = (val: string) => {
  switch (val) {
    case "A+":
    case "A":
    case "A-":
      return "green.6";

    case "B+":
    case "B":
    case "B-":
      return "green.4";

    case "C+":
    case "C":
    case "C-":
      return "yellow.6";

    case "D+":
    case "D":
    case "D-":
      return "red.4";

    case "F":
      return "red.6";

    default:
      return "red.6";
  }
};

const PageInstances: React.FC<Props> = ({ loaderData }) => {
  const t = useTranslate();

  console.log(loaderData);

  const linkTextColor = usePrimaryColor(4);

  // Rip API
  if (loaderData.error)
    return (
      <Center mt={100}>
        <Text size="xl">Rip API :(</Text>
      </Center>
    );

  // Data is loading
  if (!loaderData?.data)
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
              <Table.Td>
                <Text>{item.name}</Text>
              </Table.Td>
              <Table.Td>
                <Text c={linkTextColor}>
                  <Anchor href={item.url} target="_blank" rel="noreferrer noopener">
                    {item.url}
                  </Anchor>
                </Text>
              </Table.Td>
              <Table.Td>
                <Text>{item.version}</Text>
              </Table.Td>
              <Table.Td>
                <Badge size="lg" radius="xs" color={getCspColor(item.csp)}>
                  <Text fw="bolder">{item.csp}</Text>
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text>{item.html}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default PageInstances;
