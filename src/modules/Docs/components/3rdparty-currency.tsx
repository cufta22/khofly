import { Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconCash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const Docs3rdPartyCurrency = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={
          <IconCash style={getIconStyle(48)} color={theme.colors.green[5]} />
        }
      >
        Currency convert
      </DocsTitle>
    </Container>
  );
};

export default Docs3rdPartyCurrency;
