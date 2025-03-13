import { Accordion, Center, SimpleGrid, Text } from "@mantine/core";
import classes from "../styles.module.scss";
import { IconLabelImportant } from "@tabler/icons-react";
import { useSearchStore } from "@store/search";
import ResultItem from "./ResultItem";

const OPriority = () => {
  const domainsPriority = useSearchStore((state) => state.domainsPriority);

  return (
    <Accordion.Item className={classes.acc_item} value="priority">
      <Accordion.Control className={classes.acc_control} icon={<IconLabelImportant />}>
        <Text size="lg">Priority</Text>
      </Accordion.Control>
      <Accordion.Panel>
        {domainsPriority.length ? (
          <SimpleGrid mt="lg" cols={1} spacing="md">
            {domainsPriority.map((item, i) => (
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

export default OPriority;
