import { useBrowser } from "@hooks/use-browser";
import { Center, Container, Loader, useMantineTheme } from "@mantine/core";
import {
  IconBrandChrome,
  IconBrandEdge,
  IconBrandFirefox,
  IconBrandOpera,
  IconBrandSafari,
  IconBrandVivaldi,
  IconWorldWww,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

import SectionFirefox from "./components/set-default/SectionFirefox";
import SectionChromium from "./components/set-default/SectionChromium";
import SectionEdge from "./components/set-default/SectionEdge";
import SectionSafari from "./components/set-default/SectionSafari";
import SectionOpera from "./components/set-default/SectionOpera";
import DocsLink from "./common/DocsLink";
import DocsTitle from "./common/DocsTitle";
import SectionVivaldi from "./components/set-default/SectionVivaldi";
import DocsNextPrev from "./common/DocsNextPrev";

import { DOCS_CARD_DATA } from "./common/docsCardData";
import { useSearchParams } from "react-router";

const DocsResourcesSetDefault = () => {
  const [searchParams] = useSearchParams();
  const browser = useBrowser();
  const theme = useMantineTheme();

  const paramsBrowser =
    searchParams.get("browser")?.toLocaleLowerCase() || browser.toLocaleLowerCase();

  return (
    <Container size="lg" p="xl" pb={100}>
      {paramsBrowser === "firefox" && (
        <>
          <DocsTitle
            leftSection={
              <IconBrandFirefox style={getIconStyle(48)} color={theme.colors.orange[5]} />
            }
          >
            Adding search engine to Firefox
          </DocsTitle>

          <SectionFirefox />
        </>
      )}

      {["chromium", "chrome"].includes(paramsBrowser) && (
        <>
          <DocsTitle
            leftSection={<IconBrandChrome style={getIconStyle(48)} color={theme.colors.blue[4]} />}
          >
            Adding search engine to Chromium
          </DocsTitle>

          <SectionChromium />
        </>
      )}

      {paramsBrowser === "edge" && (
        <>
          <DocsTitle
            leftSection={<IconBrandEdge style={getIconStyle(48)} color={theme.colors.blue[5]} />}
          >
            Adding search engine to Edge
          </DocsTitle>

          <SectionEdge />
        </>
      )}

      {paramsBrowser === "safari" && (
        <>
          <DocsTitle
            leftSection={<IconBrandSafari style={getIconStyle(48)} color={theme.colors.blue[5]} />}
          >
            Adding search engine to Safari
          </DocsTitle>

          <SectionSafari />
        </>
      )}

      {paramsBrowser === "vivaldi" && (
        <>
          <DocsTitle
            leftSection={<IconBrandVivaldi style={getIconStyle(48)} color={theme.colors.red[4]} />}
          >
            Adding search engine to Vivaldi
          </DocsTitle>

          <SectionVivaldi />
        </>
      )}

      {paramsBrowser === "opera" && (
        <>
          <DocsTitle
            leftSection={<IconBrandOpera style={getIconStyle(48)} color={theme.colors.red[6]} />}
          >
            Adding search engine to Opera
          </DocsTitle>

          <SectionOpera />
        </>
      )}

      {["ie", "samsung", "unknown"].includes(paramsBrowser) && (
        <>
          <DocsTitle
            leftSection={<IconWorldWww style={getIconStyle(48)} color={theme.colors.blue[4]} />}
          >
            Adding search engine to [your browser]
          </DocsTitle>

          <DocsLink
            href={`https://khofly.com/search?q=How to add a custom search engine to ${browser}`}
            label="How to add a custom search engine to [your browser]"
          />
        </>
      )}

      {["loading"].includes(paramsBrowser) && (
        <Center mt="xl">
          <Loader size="xl" />
        </Center>
      )}

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["privatePlayer"] }}
        next={{ ...DOCS_CARD_DATA(theme)["customSearXNG"] }}
      />
    </Container>
  );
};

export default DocsResourcesSetDefault;
