import { Center, Container, Flex, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import Shortcuts from "./components/Shortcuts";

const PageIndex = () => {
  const t = useTranslate();

  const shortcutsActive = false;

  return (
    <Container
      className={classes.index_page}
      size="lg"
      pb={80}
      pt={shortcutsActive ? 200 : 80}
    >
      <Center className={classes.center}>
        <Flex className={classes.flex} align="center" direction="column">
          <Title className={classes.app_name} mb="sm">
            {!+process.env.IS_SELF_HOST!
              ? t("_common.app_name")
              : process.env.APP_NAME}
          </Title>

          <SearchBar />

          {shortcutsActive && <Shortcuts />}
        </Flex>
      </Center>
    </Container>
  );
};

export default PageIndex;
