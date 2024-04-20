import { Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconCloud, IconHaze } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const Docs3rdPartyWeather = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={
          <IconHaze style={getIconStyle(48)} color={theme.colors.orange[5]} />
        }
      >
        Current weather data
      </DocsTitle>
    </Container>
  );
};

export default Docs3rdPartyWeather;
