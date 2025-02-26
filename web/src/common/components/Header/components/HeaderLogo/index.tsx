import RemixLink from "@components/RemixLink";
import { Burger, Flex, Image } from "@mantine/core";

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

        <Image src="/assets/logo.svg" w={32} h={32} />
      </RemixLink>
    </Flex>
  );
};

export default HeaderLogo;
