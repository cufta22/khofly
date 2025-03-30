import { ActionIcon, Button, Flex, Grid, Image, Paper, Text } from "@mantine/core";
import { popularDomainNameMap } from "./utils";
import { useHover } from "@mantine/hooks";
import { IconForbid, IconLabelImportant, IconTrash } from "@tabler/icons-react";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";

interface Props {
  domain: string;
  isCurrent: boolean;
}

const DomainItem: React.FC<Props> = ({ domain, isCurrent }) => {
  const domainsPriority = useSearchStore((state) => state.domainsPriority);
  const setDomainsPriority = useSearchStore((state) => state.setDomainsPriority);
  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);
  const setDomainsBlacklist = useSearchStore((state) => state.setDomainsBlacklist);

  const displayFavicon = useSettingsStore((state) => state.displayFavicon);

  const { hovered, ref } = useHover();

  const domainTitle: string = popularDomainNameMap?.[domain] || "";

  const isPriority = domainsPriority.find((item) => item === domain);
  const isBlacklist = domainsBlacklist.find((item) => item === domain);

  const addToPriority = () => {
    if (isPriority) return;
    if (isBlacklist) removeFromBlacklist();
    setDomainsPriority([...domainsPriority, domain]);
  };
  const removeFromPriority = () => {
    if (!isPriority) return;
    const newItems = [...domainsPriority].filter((item) => item !== domain);
    setDomainsPriority(newItems);
  };

  const addToBlacklist = () => {
    if (isBlacklist) return;
    if (isPriority) removeFromPriority();
    setDomainsBlacklist([...domainsBlacklist, domain]);
  };
  const removeFromBlacklist = () => {
    if (!isBlacklist) return;
    const newItems = [...domainsBlacklist].filter((item) => item !== domain);
    setDomainsBlacklist(newItems);
  };

  return (
    <Paper ref={ref} withBorder>
      <Flex align={!isCurrent ? "center" : "flex-start"} justify="flex-start" gap="xs" p="xs">
        {displayFavicon && (
          <Image
            w={isCurrent ? 42 : 34}
            h={isCurrent ? 42 : 34}
            src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
            alt=""
            radius="sm"
          />
        )}

        {(hovered && isCurrent) || (isCurrent && (isPriority || isBlacklist)) ? (
          <Grid w="100%" gutter="xs">
            <Grid.Col span={6}>
              <Button
                onClick={isPriority ? removeFromPriority : addToPriority}
                variant={isPriority ? "filled" : "light"}
                color="green"
                w="100%"
                size="sm"
              >
                <IconLabelImportant />
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                onClick={isBlacklist ? removeFromBlacklist : addToBlacklist}
                variant={isBlacklist ? "filled" : "light"}
                color="red"
                w="100%"
                size="sm"
              >
                <IconForbid />
              </Button>
            </Grid.Col>
          </Grid>
        ) : !isCurrent ? (
          <Flex align="center" justify="space-between" w="100%">
            <Text lineClamp={1} size="lg" fw="bold">
              {domainTitle || domain}
            </Text>

            {hovered && (
              <ActionIcon
                onClick={isPriority ? removeFromPriority : removeFromBlacklist}
                color="red"
                variant="light"
                size="lg"
              >
                <IconTrash />
              </ActionIcon>
            )}
          </Flex>
        ) : (
          <Flex direction="column">
            <Text lineClamp={1}>{domainTitle || domain}</Text>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {domain}
            </Text>
          </Flex>
        )}
      </Flex>
    </Paper>
  );
};

export default DomainItem;
