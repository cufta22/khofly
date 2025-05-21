import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { removeSubdomain } from "@module/Search/components/components/Organize/components/utils";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";
import {
  IconAppWindow,
  IconCheck,
  IconDotsVertical,
  IconForbid,
  IconLabelImportant,
  IconTextScan2,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate } from "react-router";

interface Props {
  domain: string;
  url: string;
}

const ResultMenu: React.FC<Props> = ({ url, domain }) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const enableAISummary = useSettingsStore((state) => state.enableAISummary);
  const privateView = useSettingsStore((state) => state.privateView);

  const domainsPriority = useSearchStore((state) => state.domainsPriority);
  const setDomainsPriority = useSearchStore((state) => state.setDomainsPriority);

  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);
  const setDomainsBlacklist = useSearchStore((state) => state.setDomainsBlacklist);

  const setAISummaryURL = useSearchStore((state) => state.setAISummaryURL);

  const strippedDomain = removeSubdomain(domain);
  const isPriority = domainsPriority.find((item) => item === strippedDomain);
  const isBlacklist = domainsBlacklist.find((item) => item === strippedDomain);

  const hasAIFeatures = enableAISummary;

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

  const openInPrivateView = () => {
    // window.location.href = `http://localhost:4000/proxy/view?url=${url}`;
    window.open(`http://localhost:4000/proxy/view?url=${url}`, "_blank");
    // navigate(`/pv/proxy?url=${url}`);
    // console.log(url);
    // console.log(domain);
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
        {enableAISummary && (
          <Menu.Item
            leftSection={<IconTextScan2 size={18} color={theme.colors.pink["5"]} />}
            onClick={() => setAISummaryURL(url)}
          >
            AI Summary
          </Menu.Item>
        )}

        {privateView.enabled && <Menu.Divider />}
        {privateView.enabled && (
          <Menu.Item
            leftSection={<IconAppWindow size={18} color={theme.colors.indigo["5"]} />}
            onClick={() => openInPrivateView()}
          >
            Private View
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResultMenu;
