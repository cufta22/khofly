import { ActionIcon, Combobox, Divider, Flex, Image, TextInput, useCombobox } from "@mantine/core";
import { IconSearch, IconSparkles, IconX } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useEffect, useRef, useState } from "react";

import classes from "./styles.module.scss";
import { useDebouncedValue } from "@mantine/hooks";
import { useResponsive } from "@hooks/use-responsive";
import useAutocompleteSWR from "src/api/autocomplete/use-autocomplete-query";
import { useTranslate } from "@hooks/translate/use-translate";
import { useSettingsStore } from "@store/settings";
import { useSearchStore } from "@store/search";
import { useNavigate, useSearchParams } from "react-router";
import { getTabFromQuery } from "@utils/functions/getTabFromQuery";

const SearchSectionInput = () => {
  const t = useTranslate();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isSm = useResponsive("max", "sm");
  const inputRef = useRef<HTMLInputElement>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const useAutocomplete = useSettingsStore((state) => state.useAutocomplete);
  const privateSearch = useSettingsStore((state) => state.privateSearch);
  const useAIAnswers = useSettingsStore((state) => state.useAIAnswers);

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const [q, setQ] = useState(searchQuery || searchParams.get("q") || "");
  const [debouncedQ] = useDebouncedValue(q, 400);

  // Autocomplete API
  const { data, trigger, reset } = useAutocompleteSWR();

  const handleSearch = (query: string, withAI: boolean) => {
    const paramsTab = searchParams.get("tab") || "general";
    const paramsQ = searchParams.get("q") || "";

    // Infer tab from query syntax
    const { tab: tabFromSyntax } = getTabFromQuery(query);

    // Prevent unnecessary search
    if (!query.length || query === paramsQ || query === searchQuery) return;

    // Unfocus input on search
    inputRef.current?.blur();

    const qParam = `q=${encodeURIComponent(query)}`;
    const tabParam = `tab=${tabFromSyntax || paramsTab}`;
    const aiParam = withAI ? "&ai=1" : "";

    // Handle Private Search
    // Handle Private Search
    if (privateSearch) {
      setSearchQuery(encodeURIComponent(query));
      return navigate(`/search?${tabParam}${aiParam}`);
    }
    navigate(`/search?${qParam}&${tabParam}${aiParam}`);
  };

  const handleClear = () => {
    setQ("");
    reset();
  };

  const comboboxOptions = data?.map((str) => (
    <Combobox.Option value={str} key={str}>
      {str}
    </Combobox.Option>
  ));

  useEffect(() => {
    const query = searchParams.get("q");

    if (query) setQ(query);
  }, [searchParams]);

  useEffect(() => {
    if (!useAutocomplete || !debouncedQ || document.activeElement !== combobox.targetRef.current)
      return;

    trigger(debouncedQ);
  }, [debouncedQ]);

  return (
    <Combobox
      onOptionSubmit={(val) => {
        handleSearch(val, false);
        combobox.closeDropdown();
      }}
      resetSelectionOnOptionHover
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        <TextInput
          ref={inputRef}
          className={classes.search_bar}
          placeholder={t("pages.search.search_placeholder")}
          radius="md"
          size="md"
          value={q}
          onChange={(e) => {
            const val = e.currentTarget.value;

            combobox.resetSelectedOption();
            setQ(val);
            if (!val.length) reset();
          }}
          onKeyDown={(e) => {
            const isSubmitOption = combobox.getSelectedOptionIndex() !== -1;

            if (e.key === "Enter" && !isSubmitOption) {
              handleSearch(q, false);
            }
          }}
          rightSection={
            <Flex align="center" justify="flex-end">
              {q.length >= 1 && (
                <>
                  <ActionIcon
                    size="lg"
                    radius="sm"
                    color="gray"
                    variant="subtle"
                    onClick={handleClear}
                  >
                    <IconX style={getIconStyle(20)} stroke={1.5} />
                  </ActionIcon>

                  <Divider orientation="vertical" w={1} my={9} mx={4} color="gray.7" />
                </>
              )}

              <ActionIcon
                size="lg"
                radius="sm"
                color="blue"
                variant="subtle"
                onClick={() => handleSearch(q, false)}
                mr={4}
              >
                <IconSearch
                  style={getIconStyle(20)}
                  stroke={2}
                  // color="white"
                />
              </ActionIcon>

              {useAIAnswers && (
                <ActionIcon
                  size="lg"
                  radius="sm"
                  color="pink"
                  variant="subtle"
                  onClick={() => handleSearch(q, true)}
                  mr={4}
                >
                  <IconSparkles
                    style={getIconStyle(20)}
                    stroke={2}
                    // color="white"
                  />
                </ActionIcon>
              )}
            </Flex>
          }
          // rightSectionWidth={q.length >= 1 ? 83 : 40}
          rightSectionWidth="fit-content"
          // onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          maxLength={250}
          // Disable password manager stuff
          autoComplete="off"
          data-1p-ignore
          data-bwignore
          data-lpignore="true"
          data-form-type="other"
          data-protonpass-form="false"
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!comboboxOptions}>
        <Combobox.Options>{comboboxOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchSectionInput;
