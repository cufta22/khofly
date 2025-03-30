import { Code, Container, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import { IconCookie, IconLayoutRows } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsText from "./common/DocsText";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";

const DocsResourcesSiteData = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Important data for functionality</DocsTitle>

      <DocsText>
        Khofly uses site data mainly for storing user preferences that persist throughout sessions
        so that next time you visit <Code>https://khofly.com</Code> all your settings will be saved.
      </DocsText>

      <DocsText>
        If you have <Code>Clear site data</Code> option enabled in your browser settings, which you
        should, this will wipe all cookies and local storage data saved for Khofly. For best user
        experience add <Code>https://khofly.com</Code> to exceptions to this rule in your browser
        settings.
      </DocsText>

      <DocsText>Below is a list of data that Khofly uses.</DocsText>

      <DocsSubtitle
        leftSection={<IconCookie style={getIconStyle(36)} color={theme.colors.yellow[5]} />}
      >
        Cookies
      </DocsSubtitle>

      <DocsText>
        <Code>khofly-language</Code>: if you change the app language in settings it will be saved in
        a cookie.
      </DocsText>

      <DocsText>
        <Code>khofly-app-theme</Code>: if you change the app theme in settings it will be saved in a
        cookie.
      </DocsText>

      <DocsText>
        These are stored in a cookie because they are important for server-side rendering.
      </DocsText>

      <DocsSubtitle
        leftSection={<IconLayoutRows style={getIconStyle(36)} color={theme.colors.blue[5]} />}
      >
        LocalStorage
      </DocsSubtitle>

      <DocsText>
        <Code>engines-store</Code>: search engines selected in settings that are passed to SearXNG
        API.
      </DocsText>

      <DocsText>
        <Code>general-store</Code>: saves geolocation data for Weather Instant Answer so that it
        doesn't prompt for location access every time it is used. Only gets saved once user gives
        permission for location access.
      </DocsText>

      <DocsText>
        <Code>instance-store</Code>: domains for all instances ( SearXNG, Nominatim, etc. ) that
        Khofly uses.
      </DocsText>

      <DocsText>
        <Code>search-store</Code>: search settings like safe search, search language, date range,
        visited links, etc.
      </DocsText>

      <DocsText>
        <Code>settings-store</Code>: general store for settings options like autocomplete, display
        favicons, open in new tab, etc.
      </DocsText>

      <DocsText>
        These are persisted in local storage by zustand because they are "not so" important for
        server-side rendering.
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["i18n"] }}
        next={{ ...DOCS_CARD_DATA(theme)["selfHostSearXNG"] }}
      />
    </Container>
  );
};

export default DocsResourcesSiteData;
