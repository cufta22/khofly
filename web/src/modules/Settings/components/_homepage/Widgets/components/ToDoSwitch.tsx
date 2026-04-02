import { Switch } from '@mantine/core';
import { useHomepageStore } from '@store/homepage';

const ToDoSwitch = () => {
  const displayTodos = useHomepageStore((state) => state.displayTodos);
  const setDisplayTodos = useHomepageStore((state) => state.setDisplayTodos);

  return (
    <Switch checked={displayTodos} onChange={(e) => setDisplayTodos(e.currentTarget.checked)} />
  );
};

export default ToDoSwitch;
