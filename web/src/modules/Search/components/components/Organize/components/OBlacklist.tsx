import classes from "../styles.module.scss";
import { Accordion, Center, SimpleGrid, Text } from "@mantine/core";
import { useSearchStore } from "@store/search";
import { IconForbid } from "@tabler/icons-react";
import ResultItem from "./ResultItem";

const OBlacklist = () => {
  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);

  return (
    <Accordion.Item className={classes.acc_item} value="blacklist">
      <Accordion.Control className={classes.acc_control} icon={<IconForbid />}>
        <Text size="lg">Blacklist</Text>
      </Accordion.Control>
      <Accordion.Panel>
        {domainsBlacklist.length ? (
          <SimpleGrid mt="lg" cols={1} spacing="md">
            {domainsBlacklist.map((item, i) => (
              <ResultItem key={i} domain={item} isCurrent={false} />
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

export default OBlacklist;
