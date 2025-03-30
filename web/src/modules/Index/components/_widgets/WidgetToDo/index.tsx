import {
  ActionIcon,
  Checkbox,
  Flex,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import classes from "./styles.module.scss";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useStatrpageStore } from "@store/startpage";
import clsx from "clsx";

const WidgetTodo = () => {
  const theme = useMantineTheme();

  const todos = useStatrpageStore((state) => state.todos);
  const setTodos = useStatrpageStore((state) => state.setTodos);

  const handleAddNew = () => {
    setTodos([
      ...todos,
      {
        id: self.crypto.randomUUID(),
        checked: false,
        label: "New item",
      },
    ]);
  };

  const handleDelete = (id: string) => {
    const todosCopy = [...todos];

    const newTodos = todosCopy.filter((item) => item.id !== id);

    setTodos(newTodos);
  };

  const handleChange = (id: string, value: string) => {
    const todosCopy = [...todos];

    const newTodos = todosCopy.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          label: value,
        };
      } else {
        return item;
      }
    });

    setTodos(newTodos);
  };

  const handleCheck = (id: string, value: boolean) => {
    const todosCopy = [...todos];

    const newTodos = todosCopy.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: value,
        };
      } else {
        return item;
      }
    });

    setTodos(newTodos);
  };

  return (
    <Paper className={classes.widget_todo} withBorder p="lg">
      <ScrollArea h={"100%"} type="never">
        <Flex direction="column" align="center">
          <Text fz={26} fw="bold" mb="md">
            To-Dos
          </Text>

          {todos.map((item) => (
            <Flex key={item.id} align="center" w="100%" gap="xs">
              <Checkbox
                checked={item.checked}
                onChange={(e) => handleCheck(item.id, e.currentTarget.checked)}
              />
              <TextInput
                className={clsx({ [classes.line_through]: item.checked })}
                w="100%"
                variant="unstyled"
                value={item.label}
                onChange={(e) => handleChange(item.id, e.currentTarget.value)}
              />
              <ActionIcon
                color="red"
                variant="light"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <IconTrash style={getIconStyle(16)} />
              </ActionIcon>
            </Flex>
          ))}

          <Flex
            onClick={handleAddNew}
            mt="sm"
            className={classes.add_new}
            align="center"
            justify="center"
            w="100%"
          >
            <IconPlus style={getIconStyle(24)} color={theme.colors.green["5"]} />{" "}
          </Flex>
        </Flex>
      </ScrollArea>
    </Paper>
  );
};

export default WidgetTodo;
