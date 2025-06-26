import { IAWrapper } from "../../wrapper";
import { Anchor, Button, Center, Flex, LoadingOverlay, Paper, Select, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import { useState } from "react";
import { useTimeApiSWR } from "src/api/timeapi/use-timeapi-query";

import { usePrimaryColor } from "@hooks/use-primary-color";
import { TIME_ZONES } from "../TimeIn/utils";
import { DateTimePicker } from "@mantine/dates";
import type { ITimeAPITimeZoneResponse } from "src/api/timeapi/types";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Props {
  withIAWrapper: boolean;
}

const IATimeZone: React.FC<Props> = ({ withIAWrapper }) => {
  const { data, isMutating, trigger } = useTimeApiSWR();
  const apiData = data as ITimeAPITimeZoneResponse;

  const [timezone1, setTimezone1] = useState("Europe/London");
  const [timezone2, setTimezone2] = useState("America/Chicago");
  const [dateTime, setDateTime] = useState<Date | null>(null);

  const linkTextColor = usePrimaryColor(4);

  // useEffect(() => {
  //   if (input) trigger({ timezone1: input, timezone2: input, type: "time_zone" });
  // }, [input]);

  //   useEffect(() => {
  //     const newInput = findTimeZone(location);

  //     if (newInput) setInput(newInput);
  //   }, [location]);

  const handleConvert = () => {
    if (dateTime && timezone1 && timezone2) {
      trigger({
        timezone1,
        timezone2,
        dateTime: dateTime ? dayjs(dateTime).format("YYYY-MM-DD HH:mm:ss") : "",
        type: "time_zone",
      });
    }
  };

  const timeInComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <Flex direction="column" align="flex-start">
          <Flex direction="row" w="100%" justify="space-between" gap="sm" mb="md">
            <Select
              label="Time zone from"
              withCheckIcon={false}
              searchable={true}
              value={timezone1}
              onChange={(val) => {
                if (!val || val === timezone1) return;

                setTimezone1(val);
              }}
              data={Object.values(TIME_ZONES).map((val) => ({
                label: val,
                value: val,
              }))}
            />

            <Select
              label="Time zone to"
              withCheckIcon={false}
              searchable={true}
              value={timezone2}
              onChange={(val) => {
                if (!val || val === timezone2) return;

                setTimezone2(val);
              }}
              data={Object.values(TIME_ZONES).map((val) => ({
                label: val,
                value: val,
              }))}
            />
          </Flex>

          <Flex direction="row" w="100%" align="flex-end" justify="space-between" gap="sm">
            <DateTimePicker
              value={dateTime}
              onChange={(value) => setDateTime(value)}
              label="Pick date and time"
              placeholder="Pick date and time"
            />

            <Button onClick={handleConvert}>Convert</Button>
          </Flex>

          {apiData?.conversionResult?.dateTime && (
            <Text fz={36} fw="bold">
              {dayjs(apiData?.conversionResult?.dateTime).format("h:mm A")}
            </Text>
          )}
          {apiData?.conversionResult?.dateTime && (
            <Text size="xl">
              {dayjs(apiData?.conversionResult?.dateTime).format("dddd, MMMM DD, YYYY")}
            </Text>
          )}
        </Flex>

        <LoadingOverlay visible={isMutating} />
      </Paper>
    </Center>
  );

  if (withIAWrapper)
    return (
      <IAWrapper
        label={
          <Text size="sm" c="dimmed">
            Data provided by{" "}
            <Anchor href="https://timeapi.io/" rel="noreferrer noopener">
              <Text component="span" c={linkTextColor}>
                TimeAPI
              </Text>
            </Anchor>
          </Text>
        }
      >
        {timeInComponent}
      </IAWrapper>
    );

  return timeInComponent;
};

export default IATimeZone;
