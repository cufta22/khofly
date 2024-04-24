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

        <Text>Last updated: April 24, 2024</Text>

        <Flex mt="xl" mb="sm" align="center">
          <Text fz={26} fw={600}>
            Overview
          </Text>
        </Flex>

        <Text>
          TL;DR Khofly doesn't track you, it doesn't save or share any of your
          data, search or browsing history.
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconCookie
            style={getIconStyle(32)}
            color={theme.colors.yellow["5"]}
          />

          <Text fz={26} fw={600} ml="xs">
            Cookies
          </Text>
        </Flex>

        <Text>
          Cookies are used only to store user preferrences like selected
          language, color scheme of the app, etc. No personal data is stored and
          no 3rd party tracking ( or any ) cookies are ever used. You can check
          this in DevTools ( Ctrl + Shift + I ) and go into Application ( for
          Chrome ) or Storage ( for Firefox ) tab and find Cookies.
        </Text>

        <Flex mt="xl" mb="sm" align="center">
          <IconUsers style={getIconStyle(32)} color={theme.colors.pink["5"]} />

          <Text fz={26} fw={600} ml="xs">
            3rd parties
          </Text>
        </Flex>

        <List>
          <List.Item>
            <Text component="span" fz={18} fw={700}>
              Cloudflare:
            </Text>{" "}
            <Text component="span">
              Right now Khofly is hosted on Cloudflare Pages, this means that
              Cloudflare has access to all incoming requests, their privacy
              policy can be found{" "}
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
          </List.Item>

          <List.Item>
            <Text component="span" fz={18} fw={700}>
              OpenStreetMaps:
            </Text>{" "}
            <Text component="span">
              Public Nominatim API by OpenStreetMaps is used for Geocoding data
              in maps, their privacy policy can be found{" "}
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
          </List.Item>

          <List.Item>
            <Text component="span" fz={18} fw={700}>
              Hetzner:
            </Text>{" "}
            <Text component="span">
              SearXNG instance that Khofly uses is hosted on a Hetzner VPS,
              their privacy policy can be found{" "}
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
          </List.Item>

          <List.Item>
            <Text component="span" fz={18} fw={700}>
              DuckDuckGo:
            </Text>{" "}
            <Text component="span">
              If you decide to display website favicons in settings this will
              send a request to DDGs servers, keep in mind that this option is
              disabled by default, their privacy policy can be found{" "}
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
          </List.Item>
        </List>

        <Flex mt="xl" mb="sm" align="center">
          <IconLock style={getIconStyle(32)} color={theme.colors.green["6"]} />

          <Text fz={26} fw={600} ml="xs">
            For improved privacy
          </Text>
        </Flex>

        <List>
          <List.Item>
            <Text component="span" fz={18} fw={700}>
              self-host Khofly
            </Text>
          </List.Item>
          <List.Item>
            <Text component="span" fz={18} fw={700}>
              change/self-host SearXNG instance
            </Text>
          </List.Item>
          <List.Item>
            <Text component="span" fz={18} fw={700}>
              change/self-host Nominatim instance
            </Text>
          </List.Item>
          <List.Item>
            <Text component="span" fz={18} fw={700}>
              disable website favicons in settings
            </Text>
          </List.Item>
        </List>

        <Text mt="md">
          While you can generally trust public instances the only way to truly
          own your data is to host it yourself. Khofly also provides you with
          the ability to change default instances ( SearXNG, Nominatim, etc. )
          to your own for extra flexibility but if you want to go a step further
          you can also self-host Khofly itself. Guides for self-hosting can be
          found either in the Khofly docs or the official website for each
          service.
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
          <b>Email:</b>{" "}
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
          <b>Discord:</b>{" "}
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
      </Card>
    </Container>
  );
};

export default PagePrivacy;
