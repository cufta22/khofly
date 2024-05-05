import { Center, Container, Flex, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import Shortcuts from "./components/Shortcuts";
import { useRouteLoaderData } from "@remix-run/react";
import { RootLoaderData } from "@ts/global.types";

const PageIndex = () => {
  const loaderData = useRouteLoaderData("root") as RootLoaderData;
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
            {loaderData?.env?.IS_SELF_HOST === "0"
              ? t("_common.app_name")
              : loaderData?.env?.APP_NAME}
          </Title>

          <SearchBar />

          {shortcutsActive && <Shortcuts />}
        </Flex>
      </Center>
    </Container>
  );
};

export default PageIndex;
