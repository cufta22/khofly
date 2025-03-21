import { Code, Container, List, Paper, Text, useMantineTheme } from "@mantine/core";
import DocsTitle from "./common/DocsTitle";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";
import DocsCodeHighlight from "./common/DocsCodeHighlight/DocsCodeHighlight";
import DocsCodeHighlightTabs from "./common/DocsCodeHighlight/DocsCodeHighlightTabs";
import { IconFile } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import DocsNextPrev from "./common/DocsNextPrev";
import { DOCS_CARD_DATA } from "./common/docsCardData";
import DocsLink from "./common/DocsLink";

const CODE_DEPENDENCIES = `
apt update && apt upgrade
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx ffmpeg
`;

const CODE_YT_DLP = `
# Install from binaries since the apt version is insanely out of date
# You can also update it with yt-dlp -U when installing from binaries
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/bin/yt-dlp

chmod a+rx /usr/bin/yt-dlp
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

# First create the .env.local file from example file
cp .env.example .env.local

# Edit the values per provided comments
nano .env.local

# Then we can install dependencies
bun install
`;

const CODE_ECOSYSTEM = `
# Create the config
touch ecosystem.config.js

# Paste the base config from below, edit whatever you want
nano ecosystem.config.js

# Start the API with pm2
pm2 start
`;
const CODE_ECOSYSTEM_FILE = `module.exports = {
  apps : [{
    name: 'api',
    script: 'bun',
    args: 'run start',
  }]
};
`;

const CODE_NGINX = `
cd /etc/nginx/sites-available/

# Create the config for the API
touch api

# Paste the base config from below, edit whatever you want
nano api

# Link that file to /sites-enabled
ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
`;

const CODE_NGINX_FILE = `server {
    server_name example.com;

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

      <DocsText>Requirements:</DocsText>
      <List withPadding>
        <List.Item>a VPS</List.Item>
        <List.Item>Fully qualified domain name</List.Item>
      </List>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        This part is covered in{" "}
        <RemixLink to="/docs/self-host-khofly">
          <Text c={linkTextColor} component="span">
            docs/self-host-khofly
          </Text>
        </RemixLink>{" "}
        <Code>VPS</Code> section, the <Code>./scripts/install.sh</Code> script installs and runs
        both the web client and the API. If you've already run that script you probably don't need
        this page.
      </DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>Follow these steps only if you've manually installed Khofly web client.</DocsText>

      <DocsText>1. Install dependencies</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_DEPENDENCIES} language="bash" />
      </Paper>

      <DocsText>2. Install yt-dlp</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_YT_DLP} language="bash" />
      </Paper>

      <DocsText>3. Install pm2</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_PM2} language="bash" />
      </Paper>

      <DocsText>4. Install Bun</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_BUN} language="bash" />
      </Paper>

      <DocsText>
        5. Create an empty folder in your home directory, ex. <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        6. <Code>cd khofly</Code> and type{" "}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>
        6.1. Pick a branch, by default it will be on <Code>master</Code> but if you want more
        frequent updates <Code>git fetch origin staging</Code> and{" "}
        <Code>git checkout -b staging origin/staging</Code>
      </DocsText>

      <DocsText>7. Build and run API</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_BUILD_API} language="bash" />
      </Paper>

      <DocsText>8. Create the ecosystem.config file for pm2</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_ECOSYSTEM} language="bash" />
      </Paper>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: "/api/ecosystem.config.js",
              code: CODE_ECOSYSTEM_FILE,
              language: "javascript",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        9. Create Nginx config for api, don't forget to update the server_name to your domain name.
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

      <DocsSubtitle>Updating</DocsSubtitle>

      <DocsText>
        To update the API run <Code>./scripts/redeploy-api.sh api</Code>, make sure to replace "api"
        with pm2 instance name for your API.
      </DocsText>

      <DocsText>
        To get a list of all pm2 instances run <Code>pm2 ls</Code>
      </DocsText>

      <DocsText>
        You should alse keep yt-dlp up to date with <Code>yt-dlp -U</Code>
      </DocsText>

      <DocsSubtitle>YT-DLP issues</DocsSubtitle>

      <DocsText>
        Sometimes when hosting API on a server YouTube can block download requests with captcha. To
        try and avoid this we can pass cookies and PO Token arguments to yt-dlp.
      </DocsText>

      <DocsText>1. Cookies</DocsText>

      <DocsText>
        Read more about providing cookies on yt-dlp{" "}
        <DocsLink
          href="https://github.com/yt-dlp/yt-dlp/wiki/Extractors#youtube"
          label="official wiki"
        />
        .
      </DocsText>

      <DocsText>
        TL;DR With a browser extension like{" "}
        <DocsLink
          href="https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/"
          label="cookies.txt"
        />{" "}
        on Firefox or{" "}
        <DocsLink
          href="https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/"
          label="Get cookies.txt LOCALLY"
        />{" "}
        on Chormium you can extract your YouTube cookies and add it to a <Code>yt-cookies.txt</Code>{" "}
        file in the root of <Code>/api</Code> folder. So the path to your extracted cookies file
        should be <Code>/api/yt-cookies.txt</Code>. Also make sure to use a burner google account
        instead of your main one.
      </DocsText>

      <DocsText>2. PO Token</DocsText>

      <DocsText>
        Read more about providing PO Token on yt-dlp{" "}
        <DocsLink
          href="https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide"
          label="official wiki"
        />
        .
      </DocsText>

      <DocsText>TL;DR</DocsText>

      <List withPadding>
        <List.Item>
          Go to <DocsLink href="https://music.youtube.com" label="YouTube Music" /> in an incognito
          tab
        </List.Item>
        <List.Item>Click on a video</List.Item>
        <List.Item>Open DevTools (F12) - "Network" tab</List.Item>
        <List.Item>
          Filter requests by <Code>googlevideo.com</Code>
        </List.Item>
        <List.Item>
          From the most recent <Code>googlevideo.com</Code> request, extract the <Code>pot</Code>{" "}
          query parameter value from the URL
        </List.Item>
      </List>

      <DocsText>
        Paste that pot value in <Code>/api/.env.local</Code> - <Code>YT_DLP_PO_TOKEN</Code>. API
        will now use that PO Token when calling <Code>yt-dlp</Code> command.
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)["aiWorker"] }}
        next={{ ...DOCS_CARD_DATA(theme)["selfHostKhofly"] }}
      />
    </Container>
  );
};

export default DocsSelfHostResourceAPI;
