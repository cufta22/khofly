import { Divider, Paper, Stack } from '@mantine/core';

import SettingsMTitle from '../../common/SettingsTitle';
import SettingsMRow from '../../common/SettingsMRow';
import type { IOpenSection } from '@module/SettingsMobile';
import AIAnswerSwitch from '@module/Settings/components/_general/AI/AIAnswerSwitch';
import AIChatSwitch from '@module/Settings/components/_general/AI/AIChatSwitch';

interface Props {
  handleChangeSection: (next: IOpenSection) => void;
}

const SettingsMAI: React.FC<Props> = ({ handleChangeSection }) => {
  return (
    <>
      <SettingsMTitle title='pages.settings.ai.title' handleChangeSection={handleChangeSection} />
      <Paper radius='md' withBorder>
        {/* Settings content */}
        <Stack w='100%' align='start' px='lg' my='xl'>
          <SettingsMRow
            // icon={<IconExternalLink color={theme.colors.gray["5"]} />}
            desc='pages.settings.ai.toggle_ai_answers'
            control={<AIAnswerSwitch isM={true} />}
          />

          <Divider my='xs' w='100%' />

          <SettingsMRow
            // icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc='pages.settings.ai.toggle_ai_chat'
            control={<AIChatSwitch isM={true} />}
          />

          {/* AI summary not on mobile for now */}

          {/* <Divider my="xs" w="100%" />

          <SettingsMRow
            // icon={<IconExternalLink color={theme.colors.gray["5"]} />}
            desc="pages.settings.ai.toggle_ai_summary"
            control={<AISummarySwitch isM={true} mDisplay="switch" />}
          />
          <SettingsMRow
            // icon={<IconFavicon color={theme.colors.gray["5"]} />}
            desc="pages.settings.ai.ai_summary_length"
            control={<AISummarySwitch isM={true} mDisplay="dropdown" />}
          /> */}
        </Stack>
      </Paper>
    </>
  );
};

export default SettingsMAI;
