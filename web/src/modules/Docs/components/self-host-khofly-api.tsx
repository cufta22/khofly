import { Code, Container, Paper, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import DocsTitle from "./common/DocsTitle";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsLink from "./common/DocsLink";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import DocsCodeHighlight from "./common/DocsCodeHighlight/DocsCodeHighlight";
import DocsCodeHighlightTabs from "./common/DocsCodeHighlight/DocsCodeHighlightTabs";
import { IconFile } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsNextPrev from "./common/DocsNextPrev";
import { DOCS_CARD_DATA } from "./common/docsCardData";

const CODE_DEPENDENCIES = `
apt update && apt upgrade
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx ffmpeg yt-dlp
`;

const CODE_PM2 = `
npm install pm2 -g
source ~/.bashrc
`;

const CODE_BUN = `
curl -fsSL https://bun.sh/install | bash
`;

const CODE_BUILD_API = `
cd api
bun install
`;

const CODE_ECOSYSTEM = `
# Create the config
touch ecosystem.config.js

# Paste the base config from below, edit whatever you want
nano ecosystem.config.js

# Start the web client with pm2
pm2 start
`;
const CODE_ECOSYSTEM_FILE = `module.exports = {
  apps : [{
    name: 'web',
    script: 'bun',
    args: 'run start',
  }]
};
`;

const CODE_NGINX = `
cd /etc/nginx/sites-available/

# Create the config for the web client
touch web

# Paste the base config from below, edit whatever you want
nano web

# Link that file to /sites-enabled
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
`;

const CODE_NGINX_FILE = `server {
    server_name domain.com;

    root /root/api;

    location / {
        # Proxy to pm2 server on 4000 for api

        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header Origin $http_origin;
        proxy_cache_bypass $http_upgrade;
    }


    listen 80;
}
`;

const DocsSelfHostResourceAPI = () => {
  const theme = useMantineTheme();

  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Installation guide</DocsTitle>

      <DocsText>Requirements: a VPS</DocsText>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        This part is covered in{" "}
        <RemixLink to="/docs/self-host-khofly">
          <Text c={linkTextColor} component="span">
            docs/self-host-khofly
          </Text>
        </RemixLink>
        , the <Code>install.sh</Code> script installs and runs both the web client and api. If
        you've already run that script you don't need this page.
      </DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>Follow these steps only if you've manually installed Khofly web client.</DocsText>

      <DocsText>1. Install dependencies</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_DEPENDENCIES} language="bash" />
      </Paper>

      <DocsText>2. Install pm2</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_PM2} language="bash" />
      </Paper>

      <DocsText>2. Install Bun</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_BUN} language="bash" />
      </Paper>

      <DocsText>
        3. Create an empty folder in your home directory, ex. <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        4. <Code>cd khofly</Code> and type{" "}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>5. Build and run API</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_BUILD_API} language="bash" />
      </Paper>

      <DocsText>6. Create the ecosystem.config file for pm2</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_ECOSYSTEM} language="bash" />
      </Paper>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: "/web/ecosystem.config.cjs",
              code: CODE_ECOSYSTEM_FILE,
              language: "javascript",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        7. Create Nginx config for web, don't forget to update the server_name to your domain name.
      </DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_NGINX} language="bash" />
      </Paper>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: "/etc/nginx/sites-available/api",
              code: CODE_NGINX_FILE,
              language: "nginx",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        10. Add SSL certificate for your domain <Code>certbot --nginx</Code>
      </DocsText>

      <DocsText>
        11. <Code>sudo systemctl reload nginx</Code>
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["aiWorker"] }}
        next={{ ...DOCS_CARD_DATA(theme)["selfHostKhofly"] }}
      />
    </Container>
  );
};

export default DocsSelfHostResourceAPI;
