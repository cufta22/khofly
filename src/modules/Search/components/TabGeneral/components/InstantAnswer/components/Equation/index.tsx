import { Text } from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import { calculate } from "../Calculator/utils";

interface Props {
  query: string;
}

const IAEquation: React.FC<Props> = ({ query }) => {
  const calc = calculate(query);
  return (
    <IAWrapper>
      <Text size="xl">
        {calc.success ? `${query} = ${calc.result}` : `${calc.result}`}
      </Text>
    </IAWrapper>
  );
};

export default IAEquation;
