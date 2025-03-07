import { Select, Switch } from "@mantine/core";
import { IWidgetPosition, useStatrpageStore } from "@store/startpage";

interface Props {
  type: "todos" | "weather" | "clock";
}

const PositionSelect: React.FC<Props> = ({ type }) => {
  const todosPosition = useStatrpageStore((state) => state.todosPosition);
  const setTodosPosition = useStatrpageStore((state) => state.setTodosPosition);
  const weatherPosition = useStatrpageStore((state) => state.weatherPosition);
  const setWeatherPosition = useStatrpageStore((state) => state.setWeatherPosition);
  const clockPosition = useStatrpageStore((state) => state.clockPosition);
  const setClockPosition = useStatrpageStore((state) => state.setClockPosition);

  const value =
    type === "todos" ? todosPosition : type === "weather" ? weatherPosition : clockPosition;

  const handleChange = (value: IWidgetPosition) => {
    switch (type) {
      case "todos":
        setTodosPosition(value);
        break;
      case "weather":
        setWeatherPosition(value);
        break;
      case "clock":
        setClockPosition(value);
        break;
      default:
        break;
    }
  };

  return (
    <Select
      value={value}
      onChange={(val) => handleChange(val as IWidgetPosition)}
      data={[
        { label: "Top Left", value: "top-left" },
        { label: "Top Right", value: "top-right" },
      ]}
      w={150}
    />
  );
};

export default PositionSelect;
