import { Container, Flex, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import { useStatrpageStore } from "@store/startpage";
import DevInterface from "./components/DevInterface";
import useSettingsParams from "./hooks/use-set-params";

import Shortcuts from "./components/Shortcuts";
import WidgetWeather from "./components/WidgetWeather";
import WidgetTodo from "./components/WidgetToDo";
import WidgetClock from "./components/WidgetClock";
import { IS_SELF_HOST } from "@utils/resources/isSelfHost";

const PageIndex = () => {
  const t = useTranslate();

  const displayShortcuts = useStatrpageStore((state) => state.displayShortcuts);

  const displayTodos = useStatrpageStore((state) => state.displayTodos);
  const displayWeather = useStatrpageStore((state) => state.displayWeather);
  const displayClock = useStatrpageStore((state) => state.displayClock);

  const todosPosition = useStatrpageStore((state) => state.todosPosition);
  const weatherPosition = useStatrpageStore((state) => state.weatherPosition);
  const clockPosition = useStatrpageStore((state) => state.clockPosition);

  const widgets = [
    {
      component: WidgetTodo,
      display: displayTodos,
      position: todosPosition,
    },
    {
      component: WidgetWeather,
      display: displayWeather,
      position: weatherPosition,
    },
    {
      component: WidgetClock,
      display: displayClock,
      position: clockPosition,
    },
  ];

  // Change settings from params
  useSettingsParams();

  return (
    <Container
      className={classes.index_page}
      size="lg"
      // pb={80 + 70 + 70}
      // p="xl"
      // pb={170}
      // pt={240}
    >
      {/* <Center className={classes.center}> */}
      <Flex className={classes.flex} align="center" direction="column">
        <Title className={classes.app_name} mb="sm">
          {!IS_SELF_HOST ? t("_common.app_name") : process.env.APP_NAME}
        </Title>

        <SearchBar />
        {displayShortcuts && <Shortcuts />}

        {/* Startpage widgets */}
        <Flex direction="column" gap={24} className={classes.widgets_left}>
          {widgets.map((widget, i) => {
            if (!widget.display || widget.position !== "top-left") return null;

            const Widget = widget.component;
            return <Widget key={i} />;
          })}
        </Flex>

        <Flex direction="column" gap={24} className={classes.widgets_right}>
          {widgets.map((widget, i) => {
            if (!widget.display || widget.position !== "top-right") return null;

            const Widget = widget.component;
            return <Widget key={i} />;
          })}
        </Flex>
      </Flex>
      {/* </Center> */}

      <DevInterface />
    </Container>
  );
};

export default PageIndex;
