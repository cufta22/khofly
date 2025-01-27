import RemixLink from "@components/RemixLink";
import { Burger, Flex } from "@mantine/core";
import { IconTriangleFilled } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";

interface Props {
  hasBurger: boolean;
  openNavbar: boolean;
  toggleNavbar: () => void;
}

const HeaderLogo: React.FC<Props> = ({
  hasBurger,
  openNavbar,
  toggleNavbar,
}) => {
  return (
    <Flex align="center" gap="md">
      {hasBurger && (
        <Burger
          opened={openNavbar}
          onClick={toggleNavbar}
          hiddenFrom="sm"
          size="md"
        />
      )}

      <RemixLink to="/">
        <IconTriangleFilled style={getIconStyle(32)} />
      </RemixLink>
    </Flex>
  );
};

export default HeaderLogo;
