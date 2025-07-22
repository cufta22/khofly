import useToast from "@hooks/use-toast";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { removeSubdomain } from "@module/Search/components/components/Organize/components/utils";
import { useSearchStore } from "@store/search";
import { ICategories, useSettingsStore } from "@store/settings";
import { useHomepageStore } from "@store/homepage";
import {
  IconCheck,
  IconDotsVertical,
  IconExternalLink,
  IconForbid,
  IconLabelImportant,
  IconSpy,
  IconTextScan2,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate } from "react-router";

interface Props {
  domain: string;
  url: string;
  tab: ICategories;
}

const ResultMenu: React.FC<Props> = ({ url, domain, tab }) => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const AISummary = useSettingsStore((state) => state.AISummary);
  const privateView = useSettingsStore((state) => state.privateView);

  const domainsPriority = useSearchStore((state) => state.domainsPriority);
  const setDomainsPriority = useSearchStore((state) => state.setDomainsPriority);

  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);
  const setDomainsBlacklist = useSearchStore((state) => state.setDomainsBlacklist);

  const setAISummaryURL = useSearchStore((state) => state.setAISummaryURL);

  const displayShortcuts = useHomepageStore((state) => state.displayShortcuts);
  const shortcuts = useHomepageStore((state) => state.shortcuts);
  const setShortcuts = useHomepageStore((state) => state.setShortcuts);

  const strippedDomain = removeSubdomain(domain);
  const isPriority = domainsPriority.find((item) => item === strippedDomain);
  const isBlacklist = domainsBlacklist.find((item) => item === strippedDomain);

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
    //window.open(`http://localhost:4000/proxy/view?url=${url}`, "_blank");
    navigate(`/pv/proxy?url=${url}`);
  };

  const createShortcut = () => {
    const found = shortcuts.find((sc) => sc.href.includes(url));
    if (found) {
      toast.show({ message: "Shortcut already exists", color: "red" });
      return;
    }

    setShortcuts([
      ...shortcuts,
      {
        type: "item",
        title: "Shortcut",
        href: url,
        items: [],
        imgUrl: "",
      },
    ]);

    toast.show({ message: "Shortcut created", color: "green" });
  };

  const hasOrganizeResults = tab === "general";
  const hasAIFeatures = AISummary.enabled;
  const hasPrivateView = privateView.enabled && tab === "general";
  const hasShortcuts = displayShortcuts && tab === "general";

  if (!hasOrganizeResults && !hasAIFeatures && !hasPrivateView) return null;

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
        {hasOrganizeResults && (
          <Menu.Item
            leftSection={<IconLabelImportant size={18} color={theme.colors.green["5"]} />}
            rightSection={isPriority ? <IconCheck size={18} /> : null}
            onClick={isPriority ? removeFromPriority : addToPriority}
          >
            Priority
          </Menu.Item>
        )}
        {hasOrganizeResults && (
          <Menu.Item
            leftSection={<IconForbid size={18} color={theme.colors.red["5"]} />}
            rightSection={isBlacklist ? <IconCheck size={18} /> : null}
            onClick={isBlacklist ? removeFromBlacklist : addToBlacklist}
          >
            Blacklist
          </Menu.Item>
        )}

        {hasAIFeatures && hasOrganizeResults && <Menu.Divider />}
        {AISummary.enabled && ["general", "news", "science", "social_media"].includes(tab) && (
          <Menu.Item
            leftSection={<IconTextScan2 size={18} color={theme.colors.pink["5"]} />}
            onClick={() => setAISummaryURL(url)}
          >
            AI Summary
          </Menu.Item>
        )}

        {hasPrivateView && (hasAIFeatures || hasOrganizeResults) && <Menu.Divider />}
        {hasPrivateView && (
          <Menu.Item
            leftSection={<IconSpy size={18} color={theme.colors.indigo["5"]} />}
            onClick={() => openInPrivateView()}
          >
            Private View
          </Menu.Item>
        )}

        {hasShortcuts && (hasAIFeatures || hasOrganizeResults || hasPrivateView) && (
          <Menu.Divider />
        )}
        {hasShortcuts && (
          <Menu.Item leftSection={<IconExternalLink size={18} />} onClick={() => createShortcut()}>
            Create shortcut
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ResultMenu;
