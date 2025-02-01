import {
  Anchor,
  Card,
  Container,
  Flex,
  List,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCookie,
  IconLock,
  IconPhone,
  IconPoint,
  IconSpy,
  IconUsers,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const PagePrivacy = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" py={80}>
      <Card p="xl">
        <Title ta="center" mb="xl">
          Privacy Policy
        </Title>

        <Flex mt="xl" mb="sm" align="center">
          <Text fz={26} fw={600}>
            Overview
          </Text>
        </Flex>

        <Text>
          TL;DR Khofly doesn't track you, it doesn't save or share any of your data,
          search or browsing history.
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconCookie style={getIconStyle(32)} color={theme.colors.yellow["5"]} />

          <Text fz={26} fw={600} ml="xs">
            Cookies
          </Text>
        </Flex>

        <Text>
          Cookies are used only to store user preferrences like selected language, color
          scheme of the app, etc. No personal data is stored and no 3rd party tracking
          cookies are ever used. You can check this in DevTools ( Ctrl + Shift + I ) and
          go into Application ( for Chrome ) or Storage ( for Firefox ) tab and find
          Cookies.
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconUsers style={getIconStyle(32)} color={theme.colors.grape["5"]} />

          <Text fz={26} fw={600} ml="xs">
            3rd parties
          </Text>
        </Flex>

        <Text>
          <strong>Cloudflare:</strong> Any Khofly requests are proxied through Cloudflare
          DNS, this means that Cloudflare has access to all incoming requests, their
          privacy policy can be found{" "}
          <Anchor
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              here
            </Text>
          </Anchor>
        </Text>

        <Text component="span">
          <strong>OpenStreetMaps:</strong> Public Nominatim API by OpenStreetMaps is used
          for Geocoding data in maps, their privacy policy can be found{" "}
          <Anchor
            href="https://osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              here
            </Text>
          </Anchor>
        </Text>

        <Text component="span">
          <strong>Hetzner:</strong> Web UI and SearXNG instance that Khofly uses are
          hosted on Hetzner servers, their privacy policy can be found{" "}
          <Anchor
            href="https://www.hetzner.com/legal/privacy-policy/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              here
            </Text>
          </Anchor>
        </Text>

        <Text component="span">
          <strong>DuckDuckGo:</strong> If you decide to display website favicons in
          settings this will send a request to DDGs servers, keep in mind that this option
          is disabled by default, their privacy policy can be found{" "}
          <Anchor
            href="https://duckduckgo.com/privacy"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              here
            </Text>
          </Anchor>
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconLock style={getIconStyle(32)} color={theme.colors.green["5"]} />

          <Text fz={26} fw={600} ml="xs">
            For improved privacy
          </Text>
        </Flex>

        <Text component="span" fw={700}>
          self-host Khofly
        </Text>

        <Text component="span" fw={700}>
          change/self-host SearXNG instance
        </Text>

        <Text component="span" fw={700}>
          change/self-host Nominatim instance
        </Text>

        <Text component="span" fw={700}>
          disable website favicons in settings
        </Text>

        <Text mt="md">
          While you can generally trust public instances the only way to truly own your
          data is to host it yourself. Khofly also provides you with the ability to change
          default instances ( SearXNG, Nominatim, etc. ) to your own for extra flexibility
          but if you want to go a step further you can also self-host Khofly itself.
          Guides for self-hosting can be found either in the Khofly docs or the official
          website for each service.
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconPhone style={getIconStyle(32)} color={theme.colors.blue["5"]} />

          <Text fz={26} fw={600} ml="xs">
            Contact
          </Text>
        </Flex>

        <Text mb="md">
          You can contact us if you have any questions using methods below:
        </Text>

        <Text>
          <strong>Email:</strong>{" "}
          <Anchor
            href="https://discord.gg/mQ68HppVbt"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              contact@khofly.com
            </Text>
          </Anchor>
        </Text>
        <Text>
          <strong>Discord:</strong>{" "}
          <Anchor
            href="https://discord.gg/mQ68HppVbt"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text component="span" c="blue.4">
              https://discord.gg/mQ68HppVbt
            </Text>
          </Anchor>
        </Text>

        <Text ta="right">Last updated: February 1, 2025</Text>
      </Card>
    </Container>
  );
};

export default PagePrivacy;
