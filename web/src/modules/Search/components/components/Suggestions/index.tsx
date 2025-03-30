import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { ISearXNGResultsGeneral } from "@ts/searxng.types";
import { getIconStyle } from "@utils/functions/iconStyle";
import classes from "./styles.module.scss";
import { useSearchStore } from "@store/search";
import { useSettingsStore } from "@store/settings";
import useSearchQuery from "@hooks/use-search-query";
import { useNavigate } from "react-router";
import { getTabFromQuery } from "@utils/functions/getTabFromQuery";

interface Props {
  suggestions: ISearXNGResultsGeneral["suggestions"];
  type: "infobox" | "search";
}

const Suggestions: React.FC<Props> = ({ suggestions, type }) => {
  const navigate = useNavigate();

  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const handleSubmitSearch = (newQ: string) => {
    // Infer tab from query syntax
    const { tab } = getTabFromQuery(newQ);

    // Handle Private Search
    if (privateSearch) {
      setSearchQuery(encodeURIComponent(newQ));
      return navigate(`/search?tab=${tab}`);
    }

    navigate(`/search?q=${encodeURIComponent(newQ)}&tab=${tab}`);
  };

  const q = useSearchQuery();

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
