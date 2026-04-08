import { Badge, Blockquote, Flex, Select, Text, useMantineTheme } from '@mantine/core';
import DocsTitle from '../../common/DocsTitle';
import { IconAffiliate, IconBrandDebian, IconPackage } from '@tabler/icons-react';
import classes from './styles.module.scss';
import { useState } from 'react';
import SectionVPSpm2 from './components/SectionVPSpm2';
import { getIconStyle } from '@utils/functions/iconStyle';
import DocsWIP from '../../wip';

const SectionVPS = () => {
  const theme = useMantineTheme();

  // Options
  //   const [distro, setDistro] = useState<"debian">("debian");
  const [runtime, setRuntime] = useState<'pm2' | 'pods'>('pm2');

  //   const iconDistro = {
  //     debian: <IconBrandDebian style={{ ...getIconStyle(22), color: theme.colors.red[7] }} />,
  //   }[distro];
  const iconRuntime = {
    pm2: <IconAffiliate style={{ ...getIconStyle(22), color: theme.colors.blue[4] }} />,
    pods: <IconPackage style={{ ...getIconStyle(22), color: theme.colors.yellow[4] }} />,
  }[runtime];

  return (
    <>
      <Flex className={classes.self_host_title_wrapper} align='center' justify='space-between'>
        <DocsTitle>Deploying to a VPS</DocsTitle>

        <Flex align='center' gap='sm'>
          <Badge size='lg' color='green' variant='light'>
            Recommended
          </Badge>

          <Badge size='lg' color='red' variant='light'>
            ~5$/month
          </Badge>
        </Flex>
      </Flex>

      <Flex align='center' gap='sm'>
        {/* <Select
          value={distro}
          onChange={(val) => setDistro(val as "debian")}
          w={200}
          allowDeselect={false}
          leftSectionPointerEvents="none"
          leftSection={iconDistro}
          label="Distro"
          data={[{ label: "Debian", value: "debian" }]}
        /> */}

        <Select
          value={runtime}
          onChange={(val) => setRuntime(val as 'pm2' | 'pods')}
          w={200}
          allowDeselect={false}
          leftSectionPointerEvents='none'
          leftSection={iconRuntime}
          label='How to run'
          data={[
            { label: 'PM2', value: 'pm2' },
            { label: 'Containers', value: 'pods' },
          ]}
        />
      </Flex>

      {/* Explanation */}
      <Blockquote color='red' mt='xl' radius='sm' icon={<IconBrandDebian />}>
        {/* Warning for pods/pm2 */}
        {runtime === 'pm2' ? (
          <Text>
            This runs the app with pm2 on the machine directly. The setup is easier but less secure.
          </Text>
        ) : (
          <Text>
            This runs the app with podman in a container. The setup is harder but more secure.
          </Text>
        )}

        <Text mt='xs'>
          Script installs and runs the web client, API and PV. If you want just the web client move
          to manual installation steps.
        </Text>
        <Text mt='xs'>
          install.sh works on debian based distros only, for now. If you&apos;re running any other
          system move to manual installation steps and find replacements for the used packages.
        </Text>
      </Blockquote>

      {runtime === 'pm2' ? <SectionVPSpm2 /> : <DocsWIP />}
    </>
  );
};

export default SectionVPS;
