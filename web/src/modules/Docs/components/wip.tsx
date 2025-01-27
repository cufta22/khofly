import { Center, Flex, Title } from "@mantine/core";
import { IconBulldozer, IconCrane } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const DocsWIP = () => {
  return (
    <Center pt={100} p="xl">
      <Flex direction="column">
        <Flex align="center" justify="space-between" gap="xl" px="md">
          <IconCrane style={getIconStyle(100)} />

          <IconBulldozer
            style={{ ...getIconStyle(100), transform: "rotateY(180deg)" }}
          />
        </Flex>

        <Title mt="xl">Under constriction :(</Title>
      </Flex>
    </Center>
  );
};

export default DocsWIP;
