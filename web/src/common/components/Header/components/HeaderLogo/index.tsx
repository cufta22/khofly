import RemixLink from "@components/RemixLink";
import { Burger, Flex, Image } from "@mantine/core";
import classes from "./styles.module.scss";

interface Props {
  hasBurger: boolean;
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const HeaderLogo: React.FC<Props> = ({ hasBurger, openNavbar, toggleNavbar }) => {
  return (
    <Flex align="center" gap="md">
      {hasBurger && <Burger opened={openNavbar} onClick={toggleNavbar} hiddenFrom="sm" size="md" />}

      <RemixLink to="/">
        {/* <IconTriangleFilled style={getIconStyle(32)} /> */}

        <Image className={classes.header_logo} src="/assets/logo.svg" />
      </RemixLink>
    </Flex>
  );
};

export default HeaderLogo;
