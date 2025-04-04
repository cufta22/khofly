import { IAWrapper } from "../../wrapper";
import {
  ActionIcon,
  Anchor,
  Center,
  Flex,
  LoadingOverlay,
  NumberInput,
  Paper,
  Select,
  Text,
} from "@mantine/core";

import classes from "./styles.module.scss";
import { IconSwitchHorizontal } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { KEYWORDS_CURRENCY } from "../../_utils/keywords_currency";
import useCurrencySWR from "src/api/currency/use-currency-query";
import { convertCurrency } from "./utils";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { usePrimaryColor } from "@hooks/use-primary-color";
dayjs.extend(utc);

interface Props {
  withIAWrapper: boolean;
  currency1: string;
  currency2: string;
}

const IACurrency: React.FC<Props> = ({ withIAWrapper, currency1, currency2 }) => {
  const { data: dataRates, isLoading } = useCurrencySWR();

  const [state, setState] = useState({
    input: 1,
    result: 0,
    from: currency1.toLocaleUpperCase(),
    to: currency2.toLocaleUpperCase(),
  });

  const linkTextColor = usePrimaryColor(4);

  const handleChangeInput = (val: string | number) => {
    if (!dataRates?.data) return;

    const numVal = typeof val === "number" ? val : Number.parseFloat(val);
    const res = convertCurrency(numVal, state.from, state.to, dataRates?.data?.rates);

    setState((s) => ({ ...s, input: numVal, result: res }));
  };

  const handleChangeCurrency = (val: string, field: "from" | "to") => {
    if (!dataRates?.data) return;

    const res = convertCurrency(
      state.input,
      field === "from" ? val : state.from,
      field === "to" ? val : state.to,
      dataRates?.data?.rates
    );

    setState((s) => ({ ...s, [field]: val, result: res }));
  };

  const handleSwapCurrencies = () => {
    if (!dataRates?.data) return;

    const res = convertCurrency(state.input, state.to, state.from, dataRates?.data?.rates);

    setState((s) => ({
      ...s,
      from: s.to,
      to: s.from,
      result: res,
    }));
  };

  useEffect(() => {
    if (!dataRates?.data?.rates || state.result !== 0) return;

    const res = convertCurrency(1, state.from, state.to, dataRates?.data?.rates);
    setState((prev) => ({ ...prev, result: res }));
  }, [dataRates?.data?.rates]);

  const currencyComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        <Flex align="flex-end" justify="space-between" gap="md">
          <Flex gap="md" direction="column">
            <NumberInput
              value={state.input}
              onChange={handleChangeInput}
              // rightSection={<></>}
              rightSectionWidth={0}
            />

            <Select
              withCheckIcon={false}
              searchable={true}
              value={state.from}
              onChange={(val) => val && handleChangeCurrency(val, "from")}
              data={Object.keys(KEYWORDS_CURRENCY).map((key) => ({
                label: KEYWORDS_CURRENCY[key as keyof typeof KEYWORDS_CURRENCY],
                value: key,
              }))}
            />
          </Flex>

          <ActionIcon size="lg" variant="subtle" onClick={handleSwapCurrencies}>
            <IconSwitchHorizontal />
          </ActionIcon>

          <Flex gap="md" direction="column">
            <NumberInput
              value={state.result}
              // rightSection={<></>}
              rightSectionWidth={0}
              readOnly
            />

            <Select
              withCheckIcon={false}
              searchable={true}
              value={state.to}
              onChange={(val) => val && handleChangeCurrency(val, "to")}
              data={Object.keys(KEYWORDS_CURRENCY).map((key) => ({
                label: KEYWORDS_CURRENCY[key as keyof typeof KEYWORDS_CURRENCY],
                value: key,
              }))}
            />
          </Flex>
        </Flex>

        {dataRates?.data?.timestamp && (
          <Text size="sm" c="dimmed" mt="lg">
            {`1 ${state.from} ≈ ${convertCurrency(
              1,
              state.from,
              state.to,
              dataRates?.data.rates
            )} ${state.to} • ${dayjs
              .unix(dataRates?.data.timestamp)
              .format("MMM DD, hh:mm A [UTC]Z")}`}
          </Text>
        )}

        <LoadingOverlay visible={isLoading} />
      </Paper>
    </Center>
  );

  if (withIAWrapper)
    return (
      <IAWrapper
        label={
          <Text size="sm" c="dimmed">
            Data provided by{" "}
            <Anchor href="https://openexchangerates.com/" rel="noreferrer noopener">
              <Text component="span" c={linkTextColor}>
                Open Exchange Rates
              </Text>
            </Anchor>
          </Text>
        }
      >
        {currencyComponent}
      </IAWrapper>
    );

  return currencyComponent;
};

export default IACurrency;
