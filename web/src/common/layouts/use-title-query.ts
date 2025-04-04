import { useTranslate } from "@hooks/translate/use-translate";
import useSearchQuery from "@hooks/use-search-query";
import { useDocumentTitle } from "@mantine/hooks";
import { useSettingsStore } from "@store/settings";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

interface Args {
  isSearch: boolean;
  isChat: boolean;
}

// Adjust document title for query
const useTitleQuery = (args: Args) => {
  const t = useTranslate();

  const { isSearch, isChat } = args;

  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const q = useSearchQuery();

  const appName = !IS_SELF_HOST ? t("_common.app_name") : process.env.APP_NAME;

  useDocumentTitle(
    // Search query
    isSearch && !privateSearch
      ? `${q} at ${appName}`
      : // AI Chat
      isChat
      ? `AI Chat - ${appName}`
      : `${appName}`
  );
};

export default useTitleQuery;
