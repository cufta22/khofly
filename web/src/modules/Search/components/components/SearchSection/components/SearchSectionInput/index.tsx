import RemixLink from "@components/RemixLink";
import { ActionIcon, Combobox, Divider, Flex, TextInput, useCombobox } from "@mantine/core";
import { IconSearch, IconTriangleFilled, IconX } from "@tabler/icons-react";
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

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const [q, setQ] = useState(searchQuery || searchParams.get("q") || "");
  const [debouncedQ] = useDebouncedValue(q, 400);

  // Autocomplete API
  const { data, trigger, reset } = useAutocompleteSWR();

  const handleSearch = (query: string) => {
    const paramsTab = searchParams.get("tab") || "general";
    const paramsQ = searchParams.get("q") || "";

    // Prevent unnecessary search
    if (!query.length || query === paramsQ || query === searchQuery) return;

    // Unfocus input on search
    inputRef.current?.blur();

    // Handle Private Search
    if (privateSearch) {
      setSearchQuery(encodeURIComponent(query));
      return navigate(`/search?tab=${paramsTab}`);
    }
    navigate(`/search?q=${encodeURIComponent(query)}&tab=${paramsTab}`);
  };

  const handleClear = () => {
    setQ("");
    reset();
  };

  const comboboxOptions =
    data &&
    data.map((str) => (
      <Combobox.Option value={str} key={str}>
        {str}
      </Combobox.Option>
    ));

  useEffect(() => {
    const query = searchParams.get("q");

    if (query) setQ(query);
  }, [searchParams]);

  useEffect(() => {
    if (!useAutocomplete || !debouncedQ || document.activeElement !== combobox.targetRef.current) return;

    trigger(debouncedQ);
  }, [debouncedQ]);

  return (
    <Combobox
      onOptionSubmit={(val) => {
        handleSearch(val);
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
              handleSearch(q);
            }
          }}
          leftSection={
            isSm && (
              <RemixLink className={classes.app_logo_mobile} to="/">
                <IconTriangleFilled style={getIconStyle(22)} />
              </RemixLink>
            )
          }
          rightSection={
            <Flex align="center" justify="flex-end" gap={4}>
              {q.length >= 1 && (
                <>
                  <ActionIcon size="lg" radius="sm" color="gray.8" variant="transparent" onClick={handleClear}>
                    <IconX style={getIconStyle(20)} stroke={1.5} />
                  </ActionIcon>

                  <Divider orientation="vertical" w={1} my={9} color="gray.7" />
                </>
              )}

              <ActionIcon
                w={40}
                h={40}
                radius="md"
                color="gray.4"
                variant="transparent"
                onClick={() => handleSearch(q)}
              >
                <IconSearch
                  style={getIconStyle(20)}
                  stroke={2}
                  // color="white"
                />
              </ActionIcon>
            </Flex>
          }
          rightSectionWidth={q.length >= 1 ? 83 : 40}
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
