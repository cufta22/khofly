import { Container, Tabs, useMantineTheme } from "@mantine/core";
import {
  IconAirBalloon,
  IconBrandCloudflare,
  IconBrandVercel,
  IconServer,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsWIP from "./wip";
import SectionVercel from "./components/sefl-host-khofly/SectionVercel";
import SectionFly from "./components/sefl-host-khofly/SectionFly";
import SectionCloudflare from "./components/sefl-host-khofly/SectionCloudflare";
import SectionVPS from "./components/sefl-host-khofly/SectionVPS";

const DocsSelfHostKhofly = () => {
  const { colors } = useMantineTheme();

  return (
    <Container size="lg" p="xl" pb={100}>
      <Tabs variant="default" defaultValue="cloudflare" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab
            value="vercel"
            leftSection={
              <IconBrandVercel
                style={{ ...getIconStyle(28), color: colors.gray[1] }}
              />
            }
            fz={15}
          >
            Vercel
          </Tabs.Tab>
          <Tabs.Tab
            value="cloudflare"
            leftSection={
              <IconBrandCloudflare
                style={{ ...getIconStyle(28), color: colors.orange[6] }}
              />
            }
            fz={15}
          >
            Cloudflare
          </Tabs.Tab>
          <Tabs.Tab
            value="flyio"
            leftSection={
              <IconAirBalloon
                style={{ ...getIconStyle(28), color: colors.grape[4] }}
              />
            }
            fz={15}
          >
            Fly.io
          </Tabs.Tab>
          {/* <Tabs.Tab
            value="netlify"
            // leftSection={
            //     <IconBrandCloudflare
            //       style={{ ...getIconStyle(28), color: colors.orange[6] }}
            //     />
            //   }
            fz={15}
          >
            Netlify
          </Tabs.Tab> */}
          <Tabs.Tab
            value="vps"
            leftSection={
              <IconServer
                style={{ ...getIconStyle(28), color: colors.blue[4] }}
              />
            }
            fz={15}
          >
            VPS
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cloudflare">
          <SectionCloudflare />
        </Tabs.Panel>
        <Tabs.Panel value="vercel">
          <SectionVercel />
        </Tabs.Panel>
        <Tabs.Panel value="flyio">
          <SectionFly />
        </Tabs.Panel>
        <Tabs.Panel value="vps">
          <SectionVPS />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default DocsSelfHostKhofly;
