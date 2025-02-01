import { Center, Container, Flex, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";

import classes from "./styles.module.scss";
import { useTranslate } from "@hooks/translate/use-translate";
import Shortcuts from "./components/Shortcuts";
import { useShortcutsStore } from "@store/shortcuts";
import { ILoaderData_Index } from "app/routes/_index";
import DevInterface from "./components/DevInterface";

interface Props {
  loaderData: ILoaderData_Index;
}

const PageIndex: React.FC<Props> = ({ loaderData }) => {
  const t = useTranslate();

  const displayShortcuts = useShortcutsStore((state) => state.displayShortcuts);

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
          {process.env.IS_SELF_HOST === "0"
            ? t("_common.app_name")
            : process.env.APP_NAME}
        </Title>

        <SearchBar />

        {displayShortcuts && <Shortcuts />}
      </Flex>
      {/* </Center> */}

      <DevInterface loaderData={loaderData} />
    </Container>
  );
};

export default PageIndex;
