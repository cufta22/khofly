import { useTranslate } from "@hooks/translate/use-translate";
import useSearchQuery from "@hooks/use-search-query";
import { useDocumentTitle } from "@mantine/hooks";
import { useSettingsStore } from "@store/settings";
import { RootLoaderData } from "@ts/global.types";
import React from "react";

// Adjust document title for query
const useTitleQuery = (loaderData: RootLoaderData, isSearch: boolean) => {
  const t = useTranslate();

  const { privateSearch } = useSettingsStore((state) => ({
    privateSearch: state.privateSearch,
  }));

  const q = useSearchQuery();

  const appName =
    loaderData.env.IS_SELF_HOST === "0"
      ? t("_common.app_name")
      : loaderData.env.APP_NAME;

  useDocumentTitle(
    isSearch && !privateSearch ? `${q} at ${appName}` : `${appName}`
  );
};

export default useTitleQuery;