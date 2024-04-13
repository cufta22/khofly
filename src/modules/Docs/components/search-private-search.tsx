import { Container, useMantineTheme } from "@mantine/core";
import React from "react";
import WikiTitle from "./common/WikiTitle";
import { IconShield } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const DocsSearchPrivateSearch = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <WikiTitle
        leftSection={
          <IconShield style={getIconStyle(48)} color={theme.colors.green[5]} />
        }
      >
        Private Search option
      </WikiTitle>
    </Container>
  );
};

export default DocsSearchPrivateSearch;
