import classes from "./styles.module.scss";
import { Flex, ScrollArea } from "@mantine/core";
import { NAVBAR_DATA } from "@utils/resources/navbarData";
import LinksGroup from "./components/LinksGroup";

const DocsNavbar = () => {
  const links = NAVBAR_DATA.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Flex className={classes.navbar} direction="column">
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </Flex>
  );
};

export default DocsNavbar;
