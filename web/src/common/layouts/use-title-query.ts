import { useTranslate } from "@hooks/translate/use-translate";
import useSearchQuery from "@hooks/use-search-query";
import { useIsomorphicEffect } from "@mantine/hooks";
import { useSettingsStore } from "@store/settings";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

interface Args {
  isSearch: boolean;
  isIndex: boolean;
}

// Adjust document title for query
const useTitleQuery = (args: Args) => {
  const t = useTranslate();

  const { isSearch, isIndex } = args;

  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const q = useSearchQuery();

  const appName = (!IS_SELF_HOST ? t("_common.app_name") : process.env.APP_NAME) || "Khofly";

  useIsomorphicEffect(() => {
    // Reset for index
    if (isIndex) {
      document.title = appName;
      return;
    }

    if (!isSearch || privateSearch) return;

    // Change the title only on /search
    document.title = `${q} at ${appName}`;
  }, [q]);
};

export default useTitleQuery;
