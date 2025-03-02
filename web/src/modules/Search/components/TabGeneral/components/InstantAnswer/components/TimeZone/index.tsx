import { IAWrapper } from "../../wrapper";
import { Anchor, Center, Flex, LoadingOverlay, Paper, Select, Text } from "@mantine/core";

import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useTimeApiTimezoneSWR } from "src/api/timeapi/use-timeapi-query";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { usePrimaryColor } from "@hooks/use-primary-color";
dayjs.extend(utc);

interface Props {
  withIAWrapper: boolean;
  location: string;
}

const IATimeZone: React.FC<Props> = ({ withIAWrapper, location }) => {
  const { data, isMutating, trigger } = useTimeApiTimezoneSWR();

  const [input, setInput] = useState("");

  const linkTextColor = usePrimaryColor(4);

  const handleChangeSelect = (val: string) => {
    if (val === input) return;

    setInput(val);
  };

  useEffect(() => {
    if (input) trigger({ timezone: input });
  }, [input]);

  //   useEffect(() => {
  //     const newInput = findTimeZone(location);

  //     if (newInput) setInput(newInput);
  //   }, [location]);

  const timeInComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <Flex direction="column" align="flex-start">
          {/* <Select
            label="Time zone"
            withCheckIcon={false}
            searchable={true}
            value={input}
            onChange={(val) => val && handleChangeSelect(val)}
            data={Object.values(TIME_ZONES).map((val) => ({
              label: val,
              value: val,
            }))}
            mb="md"
          /> */}

          {data?.dateTime && (
            <Text fz={36} fw="bold">
              {dayjs(data?.dateTime).format("h:mm A")}
            </Text>
          )}

          {data?.dateTime && (
            <Text size="xl">{dayjs(data?.dateTime).format("dddd, MMMM DD, YYYY")}</Text>
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
