import { Code, Container, List, Paper, Text, useMantineTheme } from '@mantine/core';
import DocsTitle from './common/DocsTitle';
import DocsText from './common/DocsText';
import DocsSubtitle from './common/DocsSubtitle';
import RemixLink from '@components/RemixLink';
import { usePrimaryColor } from '@hooks/use-primary-color';
import DocsCodeHighlight from './common/DocsCodeHighlight/DocsCodeHighlight';
import DocsCodeHighlightTabs from './common/DocsCodeHighlight/DocsCodeHighlightTabs';
import { IconFile } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import DocsNextPrev from './common/DocsNextPrev';
import { DOCS_CARD_DATA } from './common/docsCardData';

const CODE_DEPENDENCIES = `
apt update && apt upgrade
apt install nodejs npm build-essential libssl-dev unzip nginx certbot python3-certbot-nginx
`;

const CODE_PM2 = `
npm install pm2 -g
source ~/.bashrc
`;

const CODE_BUN = `
curl -fsSL https://bun.sh/install | bash
`;

const CODE_BUILD_PV = `
cd pv

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
    name: 'pv',
    script: 'bun',
    args: 'run start',
  }]
};
`;

const CODE_NGINX = `
cd /etc/nginx/sites-available/

# Create the config for the API
touch pv

# Paste the base config from below, edit whatever you want
nano pv

# Link that file to /sites-enabled
ln -s /etc/nginx/sites-available/pv /etc/nginx/sites-enabled/
`;

const CODE_NGINX_FILE = `server {
    server_name example.com;

    root /root/pv;

    location / {
        # Proxy to pm2 server on 4001 for pv

        proxy_pass http://localhost:4001/;
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

const DocsSelfHostKhoflyPV = () => {
  const theme = useMantineTheme();

  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size='lg' p='xl' pb={100}>
      <DocsTitle>Installation guide</DocsTitle>

      <DocsText>Requirements:</DocsText>
      <List withPadding>
        <List.Item>a VPS</List.Item>
        <List.Item>Fully qualified domain name</List.Item>
      </List>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        This part is covered in{' '}
        <RemixLink to='/docs/self-host-khofly'>
          <Text c={linkTextColor} component='span'>
            docs/self-host-khofly
          </Text>
        </RemixLink>{' '}
        <Code>VPS</Code> section, the <Code>./scripts/install.sh</Code> script installs and runs
        both the web client and the API. If you&apos;ve already run that script you probably
        don&apos;t need this page.
      </DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>
        Follow these steps only if you&apos;ve manually installed Khofly web client.
      </DocsText>

      <DocsText>1. Install dependencies</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_DEPENDENCIES} language='bash' />
      </Paper>

      <DocsText>2. Install pm2</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_PM2} language='bash' />
      </Paper>

      <DocsText>3. Install Bun</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_BUN} language='bash' />
      </Paper>

      <DocsText>
        4. Create an empty folder in your home directory, ex. <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        5. <Code>cd khofly</Code> and type{' '}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>
        5.1. Pick a branch, by default it will be on <Code>master</Code> but if you want more
        frequent updates <Code>git fetch origin staging</Code> and{' '}
        <Code>git checkout -b staging origin/staging</Code>
      </DocsText>

      <DocsText>6. Build and run API</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_BUILD_PV} language='bash' />
      </Paper>

      <DocsText>7. Create the ecosystem.config file for pm2</DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_ECOSYSTEM} language='bash' />
      </Paper>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: '/pv/ecosystem.config.js',
              code: CODE_ECOSYSTEM_FILE,
              language: 'javascript',
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        8. Create Nginx config for PV, don&apos;t forget to update the server_name to your domain
        name.
      </DocsText>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlight code={CODE_NGINX} language='bash' />
      </Paper>
      <Paper mt='md' withBorder radius='sm' style={{ overflow: 'hidden' }}>
        <DocsCodeHighlightTabs
          code={[
            {
              fileName: '/etc/nginx/sites-available/pv',
              code: CODE_NGINX_FILE,
              language: 'nginx',
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <DocsText>
        9. Add SSL certificate for your domain <Code>certbot --nginx</Code>
      </DocsText>

      <DocsText>
        10. <Code>sudo systemctl reload nginx</Code>
      </DocsText>

      <DocsSubtitle>Updating</DocsSubtitle>

      <DocsText>
        To update the PV run <Code>./scripts/redeploy-pv.sh pv</Code>, make sure to replace
        &quot;pv&quot; with pm2 instance name for your PV.
      </DocsText>

      <DocsText>
        To get a list of all pm2 instances run <Code>pm2 ls</Code>
      </DocsText>

      <DocsNextPrev
        prev={{ ...DOCS_CARD_DATA(theme)['selfHostCFWorker'] }}
        next={{ ...DOCS_CARD_DATA(theme)['selfHostKhofly'] }}
      />
    </Container>
  );
};

export default DocsSelfHostKhoflyPV;
