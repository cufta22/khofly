import { Blockquote, Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconCash } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsText from "./common/DocsText";
import DocsLink from "./common/DocsLink";

const Docs3rdPartyCurrency = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle
        leftSection={<IconCash style={getIconStyle(48)} color={theme.colors.green[5]} />}
      >
        Currency convert
      </DocsTitle>

      <Blockquote color="yellow" mt="xl" radius="sm">
        This applies only if you want to self-host Khofly API.
      </Blockquote>

      <DocsText>
        Open Exchange Rates API is used to fetch the latest data on the server. To save on
        cost Khofly API periodically ( 1h ) fetches the latest rates and saves them on the
        server instead of client spamming OXR API every time the currency convert Instant
        Answer is used. Free plan gives you 1000 requests a month and if you do the math (
        1 req * 24h * 31 days = 744 reqs ) you won't be paying anything but you still need
        to subscribe and get your API key{" "}
        <DocsLink href="https://openexchangerates.org/signup/free" label="here" />.
      </DocsText>
    </Container>
  );
};

export default Docs3rdPartyCurrency;
