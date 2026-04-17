import { ActionIcon, Flex, Popover, rem, Text, useMantineTheme } from '@mantine/core';
import { getIconStyle } from '@utils/functions/iconStyle';
import { IconListSearch, IconTool } from '@tabler/icons-react';
import classesShared from '../../styles.module.scss';
import classes from './styles.module.css';
import clsx from 'clsx';
import InternalLink from '@components/Links/InternalLink';
import { useTranslate } from '@hooks/translate/use-translate';

const HeaderIndexTools = () => {
  const t = useTranslate();

  const theme = useMantineTheme();

  return (
    <Popover width={280} position='bottom' shadow='md'>
      <Popover.Target>
        <ActionIcon className={classesShared.action_button} variant='subtle' size={rem(36)} ml='md'>
          <IconTool style={getIconStyle(24)} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p='sm'>
        <InternalLink to='/privacy-score'>
          <Flex
            className={clsx(classes.tool_row, classes.tool_privacy_scan)}
            align='center'
            justify='flex-start'
            gap='md'
          >
            <IconListSearch style={getIconStyle(42)} color={theme.colors.grape['6']} />

            <Flex direction='column'>
              <Text fw='bold'>{t('header.privacy_scan')}</Text>

              <Text size='sm' c='dimmed'>
                {t('header.privacy_scan_desc')}
              </Text>
            </Flex>
          </Flex>
        </InternalLink>
      </Popover.Dropdown>
    </Popover>
  );
};

export default HeaderIndexTools;
