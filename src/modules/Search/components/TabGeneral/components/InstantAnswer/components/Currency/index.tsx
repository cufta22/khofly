import { IAWrapper } from "../../wrapper";
import { Center, Paper, Text } from "@mantine/core";

import classes from "./styles.module.scss";

interface Props {
  withIAWrapper: boolean;
  currency1: string;
  currency2: string;
}

const IACurrency: React.FC<Props> = ({
  withIAWrapper,
  currency1,
  currency2,
}) => {
  const currencyComponent = (
    <Center>
      <Paper className={classes.paper_base} p="md" radius="sm" withBorder>
        Currency
      </Paper>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{currencyComponent}</IAWrapper>;

  return currencyComponent;
};

export default IACurrency;
