import { Code, Container, useMantineTheme } from "@mantine/core";
import WikiTitle from "./common/WikiTitle";
import { IconCookie, IconLayoutRows } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import WikiSubtitle from "./common/WikiSubtitle";
import WikiText from "./common/WikiText";

const DocsResourcesSiteData = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <WikiTitle>Important data for functionality</WikiTitle>

      <WikiText>
        Khofly uses site data mainly for storing user preferences that persist
        throughout sessions so that next time you visit{" "}
        <Code>https://khofly.com</Code> all your settings will be saved.
      </WikiText>

      <WikiText>
        If you have <Code>Clear site data</Code> option enabled in your browser
        settings, which you should, this will wipe all cookies and local storage
        data saved for Khofly. For best user experience add{" "}
        <Code>https://khofly.com</Code> to exceptions to this rule in your
        browser settings.
      </WikiText>

      <WikiText>Below is a list of data that Khofly uses.</WikiText>

      <WikiSubtitle
        leftSection={
          <IconCookie style={getIconStyle(36)} color={theme.colors.yellow[5]} />
        }
      >
        Cookies
      </WikiSubtitle>

      <WikiText>
        <Code>khofly-language</Code>: if you change the app language in settings
        it will be saved in a cookie
      </WikiText>

      <WikiText>
        <Code>khofly-app-theme</Code>: if you change the app theme in settings
        it will be saved in a cookie
      </WikiText>

      <WikiText>
        These are stored in a cookie because they are important for server-side
        rendering.
      </WikiText>

      <WikiSubtitle
        leftSection={
          <IconLayoutRows
            style={getIconStyle(36)}
            color={theme.colors.blue[5]}
          />
        }
      >
        LocalStorage
      </WikiSubtitle>

      <WikiText>
        <Code>engines-store</Code>: search engines selected in settings that are
        passed to SearXNG API
      </WikiText>

      <WikiText>
        <Code>general-store</Code>: saves geolocation data for Weather Instant
        Answer so that it doesn't prompt for location access every time it is
        used. Only gets saved once user gives permission for location access
      </WikiText>

      <WikiText>
        <Code>instance-store</Code>: domains for all instances ( SearXNG,
        Nominatim, etc. ) that Khofly uses
      </WikiText>

      <WikiText>
        <Code>search-store</Code>: search settings like safe search, search
        language, date range, visited links, etc.
      </WikiText>

      <WikiText>
        <Code>settings-store</Code>: general store for settings options like
        autocomplete, display favicons, open in new tab, etc.
      </WikiText>

      <WikiText>
        These are persisted in local storage by zustand because they are "not
        so" important for server-side rendering.
      </WikiText>
    </Container>
  );
};

export default DocsResourcesSiteData;
