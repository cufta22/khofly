import { Badge, Blockquote, Code, Flex, Paper, Text } from "@mantine/core";
import DocsTitle from "../../common/DocsTitle";
import DocsText from "../../common/DocsText";
import DocsSubtitle from "../../common/DocsSubtitle";
import { IconBrandDebian, IconFile } from "@tabler/icons-react";
import DocsCodeHighlight from "../../common/DocsCodeHighlight/DocsCodeHighlight";
import DocsCodeHighlightTabs from "../../common/DocsCodeHighlight/DocsCodeHighlightTabs";
import { getIconStyle } from "@utils/functions/iconStyle";

const CODE_DEPENDENCIES = `
apt update && apt upgrade
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx
`;

const CODE_NVM = `
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
`;

const CODE_PNPM = `
curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=10.0.0 sh -
`;

const CODE_PM2 = `
npm install pm2 -g
source ~/.bashrc
`;

const CODE_BUILD_WEB = `
cd web
pnpm install
pnpm run build
`;

const CODE_ECOSYSTEM = `
# Create the config
touch ecosystem.config.cjs

# Paste the base config from below, edit whatever you want
nano ecosystem.config.cjs

# Start the web client with pm2
pm2 start
`;
const CODE_ECOSYSTEM_FILE = `module.exports = {
  apps : [{
    name: 'web',
    script: 'pnpm',
    args: 'run start',
    env: {
        PORT: 3001
    }
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
ln -s /etc/nginx/sites-available/web /etc/nginx/sites-enabled/
`;

const CODE_NGINX_FILE = `server {
    server_name domain.com;

    root /root/web;

    location / {
        # Proxy to pm2 server on 3001 for web

        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
`;

const SectionVPS = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <DocsTitle>Deploying to a VPS</DocsTitle>

        <Flex align="center" gap="sm">
          <Badge size="lg" color="green" variant="light">
            Recommended
          </Badge>

          <Badge size="lg" color="red" variant="light">
            ~5$/month
          </Badge>
        </Flex>
      </Flex>

      <DocsText>Requirements: a VPS</DocsText>

      <Blockquote color="red" mt="xl" radius="sm" icon={<IconBrandDebian />}>
        <Text>
          This installs and runs both the web client and api, if you want just the web client move
          to manual installation steps.
        </Text>
        <Text mt="xs">
          install.sh works on debian based distros only, for now. If you're running any other system
          move to manual installation steps and find replacements for the used packages.
        </Text>
      </Blockquote>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        1. SSH into your VPS and create an empty folder in your home directory, ex.{" "}
        <Code>mkdir khofly</Code>
      </DocsText>

      <DocsText>
        2. <Code>cd khofly</Code> and type{" "}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>
        3. Once the code is fetched, make sure that you can execute the install script{" "}
        <Code>chmod +x ./scripts/install.sh</Code>
      </DocsText>

      <DocsText>
        3.1. Don't blindly trust any script you pull from the internet, you can inspect it with{" "}
        <Code>cat ./scripts/install.sh</Code>
      </DocsText>

      <DocsText>
        4. Now you can run the script with <Code>sudo ./scripts/install.sh</Code>, if you didn't get
        any errors the installation was successful.
      </DocsText>

      <DocsText>
        5. <Code>cd /etc/nginx/sites-available/</Code> and edit the domain names for{" "}
        <Code>web</Code> and <Code>api</Code> files, and whatever other Nginx config you want to
        add.
      </DocsText>

      <DocsText>
        6. Add SSL certificate for your domain <Code>certbot --nginx</Code>
      </DocsText>

      <DocsText>
        7. <Code>sudo systemctl reload nginx</Code>
      </DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>1. Install dependencies</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_DEPENDENCIES} language="bash" />
      </Paper>

      <DocsText>2. Install NVM</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_NVM} language="bash" />
      </Paper>

      <DocsText>3. Install pnpm</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_PNPM} language="bash" />
      </Paper>

      <DocsText>4. Install pm2</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_PM2} language="bash" />
      </Paper>

      <DocsText>
        5. SSH into your VPS and create an empty folder in your home directory, ex.{" "}
        <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        6. <Code>cd khofly</Code> and type{" "}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>7. Build and run web client</DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_BUILD_WEB} language="bash" />
      </Paper>

      <DocsText>8. Create the ecosystem.config file for pm2</DocsText>
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
        9. Create Nginx config for web, don't forget to update the server_name to your domain name.
      </DocsText>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_NGINX} language="bash" />
      </Paper>
      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: "/etc/nginx/sites-available/default",
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
    </>
  );
};

export default SectionVPS;
