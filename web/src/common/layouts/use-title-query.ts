import { useTranslate } from "@hooks/translate/use-translate";
import useSearchQuery from "@hooks/use-search-query";
import { useDocumentTitle } from "@mantine/hooks";
import { useSettingsStore } from "@store/settings";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

// Adjust document title for query
const useTitleQuery = (isSearch: boolean) => {
  const t = useTranslate();

  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const q = useSearchQuery();

  const appName = !IS_SELF_HOST ? t("_common.app_name") : process.env.APP_NAME;

  useDocumentTitle(isSearch && !privateSearch ? `${q} at ${appName}` : `${appName}`);
};

export default useTitleQuery;
