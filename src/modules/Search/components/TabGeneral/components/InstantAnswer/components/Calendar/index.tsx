import { Center } from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import { Calendar as MantineCalendar } from "@mantine/dates";

import dayjs from "dayjs";

const IACalendar = () => {
  const todayDate = dayjs().toISOString().substring(0, 10);

  return (
    <IAWrapper>
      <Center>
        <MantineCalendar
          getDayProps={(date) => ({
            selected: date.toISOString().substring(0, 10) === todayDate,
          })}
        />
      </Center>
    </IAWrapper>
  );
};

export default IACalendar;
