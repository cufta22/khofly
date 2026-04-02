import { Container, Flex, Title } from '@mantine/core';
import SearchBar from './components/SearchBar';

import classes from './styles.module.scss';
import { useTranslate } from '@hooks/translate/use-translate';
import { useHomepageStore } from '@store/homepage';
import DevInterface from './components/DevInterface';
import useSettingsParams from './hooks/use-set-params';

import Shortcuts from './components/Shortcuts';
import WidgetWeather from './components/_widgets/WidgetWeather';
import WidgetTodo from './components/_widgets/WidgetToDo';
import WidgetClock from './components/_widgets/WidgetClock';
import { IS_SELF_HOST } from '@utils/resources/isSelfHost';
import WidgetNotes from './components/_widgets/WidgetNotes';
import ButtonRandomSite from './components/ButtonRandomSite';

const PageIndex = () => {
  const t = useTranslate();

  const displayShortcuts = useHomepageStore((state) => state.displayShortcuts);
  const displaySurpriseButton = useHomepageStore((state) => state.displaySurpriseButton);

  const displayTodos = useHomepageStore((state) => state.displayTodos);
  const displayNotes = useHomepageStore((state) => state.displayNotes);
  const displayWeather = useHomepageStore((state) => state.displayWeather);
  const displayClock = useHomepageStore((state) => state.displayClock);

  // const todosPosition = useHomepageStore((state) => state.todosPosition);
  // const notesPosition = useHomepageStore((state) => state.notesPosition);
  // const weatherPosition = useHomepageStore((state) => state.weatherPosition);
  // const clockPosition = useHomepageStore((state) => state.clockPosition);

  const widgets = [
    {
      component: WidgetTodo,
      display: displayTodos,
    },
    {
      component: WidgetNotes,
      display: displayNotes,
    },
    {
      component: WidgetWeather,
      display: displayWeather,
    },
    {
      component: WidgetClock,
      display: displayClock,
    },
  ];

  // Change settings from params
  useSettingsParams();

  return (
    <Container className={classes.index_page} size='lg'>
      {/* <Center className={classes.center}> */}
      <Flex className={classes.flex} align='center' direction='column'>
        <Title className={classes.app_name} mb='sm'>
          {!IS_SELF_HOST ? t('_common.app_name') : process.env.APP_NAME}
        </Title>

        <SearchBar />

        {/* Stuff below search bar */}
        {displayShortcuts && <Shortcuts />}
        {displaySurpriseButton && (
          <Flex mt='xl'>
            <ButtonRandomSite />
          </Flex>
        )}

        {/* Startpage widgets */}
        <Flex direction='column' gap={24} className={classes.widgets_left}>
          {widgets.map((widget, i) => {
            if (
              !widget.display
              // || widget.position !== "top-left"
            )
              return null;

            const Widget = widget.component;
            return <Widget key={i} />;
          })}
        </Flex>

        {/* <Flex direction="column" gap={24} className={classes.widgets_right}>
          {widgets.map((widget, i) => {
            if (!widget.display || widget.position !== "top-right") return null;

            const Widget = widget.component;
            return <Widget key={i} />;
          })}
        </Flex> */}
      </Flex>
      {/* </Center> */}

      <DevInterface />
    </Container>
  );
};

export default PageIndex;
