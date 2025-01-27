import { ActionIcon, Center, Flex, Loader, NavLink, Paper, ScrollArea, TextInput } from "@mantine/core";
import React, { Dispatch, useEffect, useState } from "react";

import classes from "./styles.module.scss";
import { IconArrowLeft, IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import useNominatimSWR from "src/api/nominatim/use-nominatim-query";
import { useResponsive } from "@hooks/use-responsive";

import { useSettingsStore } from "@store/settings";
import { useNavigate,  useSearchParams } from "react-router";
import useSearchQuery from "@hooks/use-search-query";

interface Props {
  coords: { latitude: number; longitude: number };
  setCoords: Dispatch<{ latitude: number; longitude: number }>;
}

const MapControls: React.FC<Props> = ({ coords, setCoords }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isMutating, trigger, error } = useNominatimSWR();

  const [isOpen, { toggle }] = useDisclosure(true);

  const currentQ = useSearchQuery();
  const [q, setQ] = useState(currentQ);

  const privateSearch = useSettingsStore((state) => state.privateSearch);

  const isXs = useResponsive("max", "xs");

  const handleSearch = () => {
    // Prevent empty search
    if (!q.length) return;

    trigger(q);
  };

  const handleGoBack = () => {
    const query = currentQ;

    // Handle Private Search
    if (privateSearch) {
      return navigate("/search?tab=general");
    }

    navigate(`/search?q=${encodeURIComponent(query)}&tab=general`);
  };

  const handleUpdateMap = (lat: string, lon: string) => {
    setCoords({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    if (isXs) toggle();
  };

  useEffect(() => {
    // Don't search on render in dev to prevent API spam
    // Maybe fix if self-host nominatim API
    if (process?.env?.NODE_ENV === "production") {
      if (!data?.length && currentQ?.length) trigger(currentQ);
    }

    if (currentQ) setQ(currentQ);
  }, [currentQ]);

  useEffect(() => {
    if (!coords.latitude && !coords.longitude && data?.length && !error) {
      setCoords({
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      });
    }
  }, [data]);

  return (
    <Paper
      className={clsx(classes.map_controls, {
        [classes.map_controls_closed]: !isOpen,
      })}
      radius={0}
    >
      {/* Mobile slide controls */}
      <Flex className={classes.controls_slide} onClick={toggle} align="center" justify="center" p="xs">
        <IconChevronLeft style={getIconStyle(22)} />
      </Flex>

      <Flex className={classes.map_controls_head} p="xs" gap="xs">
        <ActionIcon className={classes.action_icon} variant="light" onClick={handleGoBack}>
          <IconArrowLeft />
        </ActionIcon>

        <TextInput
          className={classes.map_input}
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          size="md"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          rightSection={
            <>
              <ActionIcon w={40} h={40} radius="sm" variant="blue" onClick={() => handleSearch()}>
                <IconSearch style={getIconStyle(22)} stroke={1.5} color="white" />
              </ActionIcon>
            </>
          }
        />
      </Flex>

      <ScrollArea className={classes.osm_results}>
        {isMutating && (
          <Center>
            <Loader mt="lg" />
          </Center>
        )}

        {!isMutating && data && data?.length < 1 && <Center py="xs">No results, try with different query</Center>}

        {data && data?.length && !error && !isMutating
          ? data?.map((row, i) => (
              <NavLink
                key={i}
                label={row.display_name}
                leftSection={<IconSearch size="1rem" stroke={1.5} />}
                onClick={(e) => handleUpdateMap(row.lat, row.lon)}
              />
            ))
          : null}
      </ScrollArea>

      {/* Toggle icon */}
      <ActionIcon
        variant="default"
        className={clsx(classes.controls_toggle, {
          [classes.controls_toggle_closed]: !isOpen,
        })}
        onClick={toggle}
      >
        <IconChevronLeft style={getIconStyle(18)} />
      </ActionIcon>
    </Paper>
  );
};

export default MapControls;
