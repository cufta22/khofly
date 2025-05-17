import { ActionIcon, Autocomplete, Flex, Loader, rem, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconSearch, IconSparkles } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import classes from "./styles.module.scss";
import { useDebouncedValue } from "@mantine/hooks";
// import VirtualKeyboard from "../VirtualKeyboard";

import { useResponsive } from "@hooks/use-responsive";
import useAutocompleteSWR from "src/api/autocomplete/use-autocomplete-query";
import { nprogress } from "@mantine/nprogress";
import { useTranslate } from "@hooks/translate/use-translate";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import { useNavigate } from "react-router";
import { getTabFromQuery } from "@utils/functions/getTabFromQuery";
import clsx from "clsx";

const SearchBar = () => {
  const t = useTranslate();

  const theme = useMantineTheme();

  const enableAutocomplete = useSettingsStore((state) => state.enableAutocomplete);
  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const enableAIAnswers = useSettingsStore((state) => state.enableAIAnswers);

  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const navigate = useNavigate();

  // const [openKeyboard, { toggle: toggleKeyboard }] = useDisclosure();

  const [q, setQ] = useState("");
  const [debouncedQ] = useDebouncedValue(q, 300);

  const isXs = useResponsive("max", "xs");
  const isXl = useResponsive("min", 1921);

  // Sizes
  const rsNoOfIconsBase = 1;
  const rsNoOfIconsAll = enableAIAnswers ? rsNoOfIconsBase + 1 : rsNoOfIconsBase;
  const rsWidth = {
    1: isXs ? 38 : isXl ? 54 : 44,
    2: isXs ? 76 : isXl ? 108 : 88,
    // 3: isXs ? 114 : isXl ? 162 : 132,
  }[rsNoOfIconsAll];

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
    if (!enableAutocomplete || !debouncedQ) return;

    trigger(debouncedQ);
  }, [debouncedQ]);

  return (
    <>
      <Autocomplete
        // Responsive styles
        classNames={{
          root: classes.search_bar,
          input: classes.input,
        }}
        leftSectionProps={{
          className: classes.left_section,
        }}
        rightSectionProps={{
          className: classes[`rigth_section_w_${rsNoOfIconsAll}`],
        }}
        placeholder={t("pages.index.search_placeholder")}
        radius="xl"
        value={q}
        onChange={(val) => {
          setQ(val);
          if (!val.length) reset();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(q, false);
        }}
        leftSection={
          isMutating ? (
            <Loader
              classNames={{
                root: clsx("desktop_only"),
              }}
              size={rem(24)}
            />
          ) : (
            <IconSearch
              className={clsx("desktop_only", classes.search_normal_icon)}
              // style={getIconStyle(24)}
              // stroke={1.5}
            />
          )
        }
        // leftSectionWidth="auto"
        rightSection={
          <Flex align="flex-end" justify="flex-end" w="100%" gap={6} pr={6}>
            {/* <ActionIcon
              className={clsx("desktop_only", classes.search_action_icon)}
              // size={isXs ? 32 : 38}
              radius="xl"
              color={"white"}
              variant="subtle"
              onClick={toggleKeyboard}
            >
              <IconKeyboard color={theme.colors.gray["4"]} stroke={2} />
            </ActionIcon> */}

            <ActionIcon
              className={classes.search_action_icon}
              // size={isXs ? 32 : 38}
              radius="xl"
              color={theme.colors[theme.primaryColor][6]}
              variant="subtle"
              onClick={() => handleSearch(q, false)}
              disabled={!q}
            >
              <IconArrowRight />
            </ActionIcon>

            {enableAIAnswers && (
              <ActionIcon
                className={classes.search_action_icon}
                // size={isXs ? 32 : 38}
                radius="xl"
                color={theme.colors.pink[6]}
                variant="subtle"
                onClick={() => handleSearch(q, true)}
                disabled={!q}
              >
                <IconSparkles />
              </ActionIcon>
            )}
          </Flex>
        }
        rightSectionWidth={rsWidth}
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

      {/* {openKeyboard && <VirtualKeyboard value={q} onChange={setQ} toggle={toggleKeyboard} />} */}
    </>
  );
};

export default SearchBar;
