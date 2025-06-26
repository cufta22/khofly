import { Text } from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import { calculate } from "../Calculator/utils";

interface Props {
  query: string;
}

const IAEquation: React.FC<Props> = ({ query }) => {
  const cleanedQuery = query.replace(/[^\d+\-*/. ]/g, ""); // Keep digits, +, -, *, /, ., and spaces
  const calc = calculate(cleanedQuery);

  return (
    <IAWrapper>
      <Text size="xl">{calc.success ? `${cleanedQuery} = ${calc.result}` : `${calc.result}`}</Text>
    </IAWrapper>
  );
};

export default IAEquation;
