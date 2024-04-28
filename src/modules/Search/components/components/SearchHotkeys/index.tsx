import { useHotkeys } from "@mantine/hooks";
import { ISearXNGResultsGeneral, ISearXNGResultsNews } from "@ts/searxng.types";

interface Props {
  data: string[];
  selectedRow: string;
  setSelectedRow: (url: string) => void;
}

export const getArrayOfURLs = (
  data: ISearXNGResultsGeneral[] | ISearXNGResultsNews[]
) => {
  return data.reduce((acc: string[], obj) => {
    obj.results.forEach((result) => {
      acc.push(result.url);
    });
    return acc;
  }, []);
};

const SearchHotkeys: React.FC<Props> = ({
  data,
  selectedRow,
  setSelectedRow,
}) => {
  useHotkeys([
    [
      "ArrowUp",
      () => {
        if (!selectedRow) setSelectedRow(data[data.length - 1]);

        const currentIdx = data.findIndex((val) => val === selectedRow);
        if (currentIdx !== 0) setSelectedRow(data[currentIdx - 1]);
      },
    ],
    [
      "ArrowDown",
      () => {
        if (!selectedRow) setSelectedRow(data[0]);

        const currentIdx = data.findIndex((val) => val === selectedRow);

        if (currentIdx !== data.length - 1)
          setSelectedRow(data[currentIdx + 1]);
      },
    ],
  ]);

  return null;
};

export default SearchHotkeys;
