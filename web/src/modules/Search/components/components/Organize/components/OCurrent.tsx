import { Accordion, Center, SimpleGrid, Text } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import classes from "../styles.module.scss";
import DomainItem from "./DomainItem";
import { useSearchStore } from "@store/search";

const OCurrent = () => {
  const domainsCurrent = useSearchStore((state) => state.domainsCurrent);

  return (
    <Accordion.Item className={classes.acc_item} value="current">
      <Accordion.Control className={classes.acc_control} icon={<IconLink />}>
        <Text size="lg">Current domains</Text>
      </Accordion.Control>
      <Accordion.Panel>
        {domainsCurrent.length ? (
          <SimpleGrid mt="lg" cols={2} spacing="md">
            {domainsCurrent.map((item) => (
              <DomainItem key={item} domain={item} isCurrent />
            ))}
          </SimpleGrid>
        ) : (
          <Center>
            <Text>Wow, such empty</Text>
          </Center>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default OCurrent;
