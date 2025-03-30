import { ActionIcon, Autocomplete, Flex, Loader, rem, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconKeyboard, IconSearch, IconSparkles } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import classes from "./styles.module.scss";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import VirtualKeyboard from "../VirtualKeyboard";

import { getIconStyle } from "@utils/functions/iconStyle";
import { useResponsive } from "@hooks/use-responsive";
import useAutocompleteSWR from "src/api/autocomplete/use-autocomplete-query";
import { nprogress } from "@mantine/nprogress";
import { useTranslate } from "@hooks/translate/use-translate";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import { useNavigate } from "react-router";
import { getTabFromQuery } from "@utils/functions/getTabFromQuery";

const SearchBar = () => {
  const t = useTranslate();

  const theme = useMantineTheme();

  const useAutocomplete = useSettingsStore((state) => state.useAutocomplete);
  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);

  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const navigate = useNavigate();

  const [openKeyboard, { toggle: toggleKeyboard }] = useDisclosure();

  const [q, setQ] = useState("");
  const [debouncedQ] = useDebouncedValue(q, 300);

  const isXs = useResponsive("max", "xs");
  const isXl = useResponsive("min", 1921);

  // Autocomplete API
  const { data: autocompleteData, isMutating, trigger, reset } = useAutocompleteSWR();

  const handleSearch = (query: string, withAI: boolean) => {
    // Prevent empty search
    if (!query.length) return;

    nprogress.start();

    // Infer tab from query syntax
    const { tab: tabFromSyntax } = getTabFromQuery(query);

    const qParam = `q=${encodeURIComponent(query)}`;
    const tabParam = `tab=${tabFromSyntax || "general"}`;
    const aiParam = withAI ? "&ai=1" : "";

    // Handle Private Search
    if (privateSearch) {
      setSearchQuery(encodeURIComponent(query));
      return navigate(`/search?${tabParam}${aiParam}`);
    }
    navigate(`/search?${qParam}&${tabParam}${aiParam}`);
  };

  useEffect(() => {
    if (!useAutocomplete || !debouncedQ) return;

    trigger(debouncedQ);
  }, [debouncedQ]);

  return (
    <>
      <Autocomplete
        className={classes.search_bar}
        placeholder={t("pages.index.search_placeholder")}
        radius="xl"
        size={isXs ? "md" : isXl ? "xl" : "lg"}
        value={q}
        onChange={(val) => {
          setQ(val);
          if (!val.length) reset();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(q, false);
        }}
        leftSection={
          !isXs &&
          (isMutating ? (
            <Loader size={rem(24)} />
          ) : (
            <IconSearch style={getIconStyle(24)} stroke={1.5} />
          ))
        }
        // leftSectionWidth="auto"
        rightSection={
          <Flex align="center" justify="flex-end">
            {!isXs && (
              <ActionIcon
                size={isXs ? 32 : 38}
                mr={6}
                radius="xl"
                color={"white"}
                variant="subtle"
                onClick={toggleKeyboard}
              >
                <IconKeyboard style={getIconStyle(18)} color={"white"} />
              </ActionIcon>
            )}

            <ActionIcon
              size={isXs ? 32 : 38}
              mr={6}
              radius="xl"
              color={theme.colors[theme.primaryColor][6]}
              variant="subtle"
              onClick={() => handleSearch(q, false)}
              disabled={!q}
            >
              <IconArrowRight style={getIconStyle(22)} />
            </ActionIcon>

            {useAIAnswers && (
              <ActionIcon
                size={isXs ? 32 : 38}
                mr={6}
                radius="xl"
                color={theme.colors.pink[6]}
                variant="subtle"
                onClick={() => handleSearch(q, true)}
                disabled={!q}
              >
                <IconSparkles style={getIconStyle(22)} />
              </ActionIcon>
            )}
          </Flex>
        }
        // rightSectionWidth={isXs ? 40 : 170}
        rightSectionWidth="fit-content"
        maxLength={250}
        autoFocus
        // Autocomplete props
        data={autocompleteData ? autocompleteData?.map((str) => ({ label: str, value: str })) : []}
        comboboxProps={{
          onOptionSubmit: (val) => handleSearch(val, false),
          size: "md",
        }}
        pr="xs"
        // Disable password manager stuff
        autoComplete="off"
        data-1p-ignore
        data-bwignore
        data-lpignore="true"
        data-form-type="other"
        data-protonpass-form="false"
      />

      {openKeyboard && <VirtualKeyboard value={q} onChange={setQ} toggle={toggleKeyboard} />}
    </>
  );
};

export default SearchBar;
