import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { removeSubdomain } from "@module/Search/components/components/Organize/components/utils";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";
import {
  IconCheck,
  IconDotsVertical,
  IconForbid,
  IconLabelImportant,
  IconList,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

interface Props {
  domain: string;
  url: string;
}

const ResultMenu: React.FC<Props> = ({ url, domain }) => {
  const theme = useMantineTheme();

  const useAISummary = useSettingsStore((state) => state.useAISummary);

  const domainsPriority = useSearchStore((state) => state.domainsPriority);
  const setDomainsPriority = useSearchStore((state) => state.setDomainsPriority);

  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);
  const setDomainsBlacklist = useSearchStore((state) => state.setDomainsBlacklist);

  const setAISummaryURL = useSearchStore((state) => state.setAISummaryURL);

  const strippedDomain = removeSubdomain(domain);
  const isPriority = domainsPriority.find((item) => item === strippedDomain);
  const isBlacklist = domainsBlacklist.find((item) => item === strippedDomain);

  const hasAIFeatures = useAISummary;

  const addToPriority = () => {
    if (isPriority) return;
    if (isBlacklist) removeFromBlacklist();
    setDomainsPriority([...domainsPriority, strippedDomain]);
  };
  const removeFromPriority = () => {
    if (!isPriority) return;
    const newItems = [...domainsPriority].filter((item) => item !== strippedDomain);
    setDomainsPriority(newItems);
  };

  const addToBlacklist = () => {
    if (isBlacklist) return;
    if (isPriority) removeFromPriority();
    setDomainsBlacklist([...domainsBlacklist, strippedDomain]);
  };
  const removeFromBlacklist = () => {
    if (!isBlacklist) return;
    const newItems = [...domainsBlacklist].filter((item) => item !== strippedDomain);
    setDomainsBlacklist(newItems);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          className="desktop_only"
          onClick={(e) => e.preventDefault()}
          size={24}
          variant="subtle"
        >
          <IconDotsVertical style={getIconStyle(18)} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Organize</Menu.Label>

        <Menu.Item
          leftSection={<IconLabelImportant size={18} color={theme.colors.green["5"]} />}
          rightSection={isPriority ? <IconCheck size={18} /> : null}
          onClick={isPriority ? removeFromPriority : addToPriority}
        >
          Priority
        </Menu.Item>
        <Menu.Item
          leftSection={<IconForbid size={18} color={theme.colors.red["5"]} />}
          rightSection={isBlacklist ? <IconCheck size={18} /> : null}
          onClick={isBlacklist ? removeFromBlacklist : addToBlacklist}
        >
          Blacklist
        </Menu.Item>

        {hasAIFeatures && <Menu.Divider />}

        {hasAIFeatures && <Menu.Label>AI</Menu.Label>}

        {useAISummary && (
          <Menu.Item
            leftSection={<IconList size={18} color={theme.colors.pink["5"]} />}
            onClick={() => setAISummaryURL(url)}
          >
            AI Summary
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResultMenu;
