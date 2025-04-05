import RemixLink from "@components/RemixLink";
import { Burger, Flex, Image, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconMessage } from "@tabler/icons-react";

interface Props {
  isChat: boolean;
  hasBurger: boolean;
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const HeaderLogo: React.FC<Props> = ({ isChat, hasBurger, openNavbar, toggleNavbar }) => {
  const theme = useMantineTheme();

  return (
    <Flex align="center" gap="md">
      {hasBurger && (
        <Burger
          opened={openNavbar}
          onClick={toggleNavbar}
          hiddenFrom={isChat ? "" : "sm"}
          size="md"
        />
      )}

      <RemixLink className={classes.link} to="/">
        {/* <IconTriangleFilled style={getIconStyle(32)} /> */}

        {isChat ? (
          <IconMessage className={classes.header_logo} color={theme.colors.pink[5]} />
        ) : (
          <Image className={classes.header_logo} src="/assets/logo.svg" />
        )}
      </RemixLink>
    </Flex>
  );
};

export default HeaderLogo;
