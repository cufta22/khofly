import { Code, List, Paper } from '@mantine/core';
import DocsText from '../../../common/DocsText';
import DocsSubtitle from '../../../common/DocsSubtitle';
import { IconFile } from '@tabler/icons-react';
import DocsCodeHighlight from '../../../common/DocsCodeHighlight/DocsCodeHighlight';
import DocsCodeHighlightTabs from '../../../common/DocsCodeHighlight/DocsCodeHighlightTabs';
import { getIconStyle } from '@utils/functions/iconStyle';

const CODE_DEPENDENCIES = `
apt update && apt upgrade
apt install build-essential libssl-dev unzip nginx certbot python3-certbot-nginx ffmpeg
`;

const CODE_NVM = `
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 25
`;

const CODE_PNPM = `
curl -fsSL https://get.pnpm.io/install.sh | sh -
`;

const CODE_PM2 = `
npm install pm2 -g
source ~/.bashrc
`;

const CODE_BUN = `
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
`;

const CODE_BUILD_WEB = `
cd web

# First create the .env.local file from example file
cp .env.example .env.local

# Edit the values per provided comments
nano .env.local

# Then we can install dependencies and build
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
    script: 'npm',
    args: 'run start',
    env: {
        PORT: 3000
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
    server_name example.com;

    root /root/web;

    location / {
        # Proxy to pm2 server on 3000 for web

        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
`;

const SectionVPScont = () => {
  return (
    <>
      <DocsText>Requirements:</DocsText>
      <List withPadding>
        <List.Item>a VPS</List.Item>
        <List.Item>Fully qualified domain name</List.Item>
      </List>

      <DocsSubtitle>OPTION 1. Manual installation</DocsSubtitle>

      <DocsText>1. Install dependencies</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_DEPENDENCIES} language='bash' />
      </Paper>

      <DocsText>2. Install NVM</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_NVM} language='bash' />
      </Paper>

      <DocsText>3. Install pnpm</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_PNPM} language='bash' />
      </Paper>

      <DocsText>4. Install pm2</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_PM2} language='bash' />
      </Paper>

      <DocsText>5. Install Bun</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_BUN} language='bash' />
      </Paper>

      <DocsText>
        6. Create an empty folder in your home directory, ex. <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        7. <Code>cd khofly</Code> and type{' '}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>
        7.1. Pick a branch, by default it will be on <Code>master</Code> but if you want more
        frequent updates <Code>git fetch origin staging</Code> and{' '}
        <Code>git checkout -b staging origin/staging</Code>
      </DocsText>

      <DocsText>8. Build and run web client</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_BUILD_WEB} language='bash' />
      </Paper>

      <DocsText>9. Create the ecosystem.config file for pm2</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_ECOSYSTEM} language='bash' />
      </Paper>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: '/web/ecosystem.config.cjs',
              code: CODE_ECOSYSTEM_FILE,
              language: 'javascript',
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        10. Create Nginx config for web, don&apos;t forget to update the server_name to your domain
        name.
      </DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_NGINX} language='bash' />
      </Paper>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: '/etc/nginx/sites-available/web',
              code: CODE_NGINX_FILE,
              language: 'nginx',
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        11. Add SSL certificate for your domain <Code>certbot --nginx</Code>
      </DocsText>

      <DocsText>
        12. <Code>sudo systemctl reload nginx</Code>
      </DocsText>

      <DocsSubtitle>Updating</DocsSubtitle>

      <DocsText>
        To update the web client, API and PV run <Code>./scripts/update.sh</Code>. This will fetch
        the latest code and rebuild everything.
      </DocsText>

      <DocsText>
        Make sure it is executable <Code>chmod +x ./scripts/update.sh</Code>.
      </DocsText>
    </>
  );
};

export default SectionVPScont;
