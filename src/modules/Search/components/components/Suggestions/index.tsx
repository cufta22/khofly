import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { IconSearch } from "@tabler/icons-react";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";
import classes from "./styles.module.scss";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";

interface Props {
  suggestions: ISearXNGResultsGeneral["suggestions"];
  type: "infobox" | "search";
}

const Suggestions: React.FC<Props> = ({ suggestions, type }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { privateSearch } = useSettingsStore((state) => ({
    privateSearch: state.privateSearch,
  }));
  const { setSearchQuery } = useSearchStore((state) => ({
    setSearchQuery: state.setSearchQuery,
  }));

  const handleSubmitSearch = (newQ: string) => {
    // Handle Private Search
    if (privateSearch) {
      setSearchQuery(encodeURIComponent(newQ));
      return navigate("/search?tab=general");
    }

    navigate(`/search?q=${encodeURIComponent(newQ)}&tab=general`);
  };

  const q = searchParams.get("q") || "";

  if (type === "infobox")
    return (
      <Stack ml={80} className={classes.search_suggestionbox}>
        <Text size="lg">
          Searches related to <b>{q}</b>
        </Text>

        {suggestions.slice(0, 5).map((s, i) => (
          <Button
            w="fit-content"
            key={i}
            variant="subtle"
            color="gray"
            leftSection={<IconSearch style={getIconStyle(18)} color="gray" />}
            onClick={() => handleSubmitSearch(s)}
          >
            <Text truncate ta="left">
              {s}
            </Text>
          </Button>
        ))}
      </Stack>
    );

  return (
    <>
      <Text size="lg">
        Searches related to <b>{q}</b>
      </Text>

      <SimpleGrid cols={{ base: 2, sm: 2 }}>
        {suggestions.map((s, i) => (
          <Button
            key={i}
            variant="default"
            leftSection={<IconSearch style={getIconStyle(18)} color="gray" />}
            onClick={() => handleSubmitSearch(s)}
            ta="left"
          >
            <Text truncate>{s}</Text>
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Suggestions;