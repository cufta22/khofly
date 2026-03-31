import RemixLink from "@components/RemixLink";
import { Burger, Flex, Image, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconHeart, IconMessage } from "@tabler/icons-react";
import { useGeneralStore } from "@store/general";

interface Props {
  isChat: boolean;
  isSupport: boolean;
  hasBurger: boolean;
}

const HeaderLogo: React.FC<Props> = ({ isChat, isSupport, hasBurger }) => {
  const theme = useMantineTheme();

  const openNavbar = useGeneralStore((state) => state.openNavbar);
  const toggleOpenNavbar = useGeneralStore((state) => state.toggleOpenNavbar);

  return (
    <Flex align="center" gap="md">
      {hasBurger && (
        <Burger
          opened={openNavbar}
          onClick={toggleOpenNavbar}
          // hiddenFrom={isChat ? "" : "sm"}
          size="md"
        />
      )}

      <RemixLink className={classes.link} to="/">
        {/* <IconTriangleFilled style={getIconStyle(32)} /> */}

        {isChat ? (
          <IconMessage className={classes.header_logo} color={theme.colors.pink[5]} />
        ) : isSupport ? (
          <IconHeart className={classes.header_logo} color={theme.colors.red[5]} />
        ) : (
          <Image className={classes.header_logo} src="/assets/logo.svg" />
        )}
      </RemixLink>
    </Flex>
  );
};

export default HeaderLogo;
