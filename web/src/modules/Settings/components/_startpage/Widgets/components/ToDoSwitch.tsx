import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";

const ToDoSwitch = () => {
  const displayTodos = useStatrpageStore((state) => state.displayTodos);
  const setDisplayTodos = useStatrpageStore((state) => state.setDisplayTodos);

  return (
    <Switch checked={displayTodos} onChange={(e) => setDisplayTodos(e.currentTarget.checked)} />
  );
};

export default ToDoSwitch;
