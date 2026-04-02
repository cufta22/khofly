import type {
  SelectProps} from '@mantine/core';
import {
  Flex,
  Group,
  Image,
  Select,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { getAIChatModels, getAIChatProviders } from '@module/Chat/data';
import { getAIChatModelIcon, getAIChatModelSource } from '@module/Chat/utils';
import { WORKER_MODELS_DATA } from '@module/Settings/components/_instances/AIWorker/data';
import type { IAIProvider} from '@store/aichat';
import { useAIChatStore } from '@store/aichat';
import { IWeatherSource, IWorkerModels, useInstanceStore } from '@store/instance';
import { useSettingsStore } from '@store/settings';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';

const MoreAIAnswerOptions = () => {
  const theme = useMantineTheme();

  const AIAnswer = useSettingsStore((state) => state.AIAnswer);
  const setAIAnswer = useSettingsStore((state) => state.setAIAnswer);

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const config = useAIChatStore((state) => state.config);

  const aiSource = getAIChatModelSource(AIAnswer.model.value);
  const providerData = getAIChatProviders({
    cfWorkerURL: workerDomain,
    hasGeminiKey: config.hasGeminiKey,
  });
  const modelData = getAIChatModels(AIAnswer.provider);

  const getIconProvider = (value: string) => {
    if (value.includes('cf')) {
      return <Image src='/assets/engines/cloudflare-icon.svg' w={16} h={16} />;
    }
    if (value.includes('google')) {
      return <Image src='/assets/engines/google-icon.svg' w={16} h={16} />;
    }
  };

  const renderSelectOptionProvider: SelectProps['renderOption'] = ({ option }) => (
    <Group flex='1' gap='xs'>
      {getIconProvider(option.value)}
      {option.label}
    </Group>
  );
  const renderSelectOptionModel: SelectProps['renderOption'] = ({ option }) => (
    <Group flex='1' gap='xs'>
      {getAIChatModelIcon(option.value, 16)}
      {option.label}

      {['imagen-3.0-generate-002', 'gemini-2.5-pro-preview'].includes(option.value) && (
        <>
          <div style={{ flex: 1 }} />
          <IconCurrencyDollar style={getIconStyle(20)} color={theme.colors.green[6]} />
        </>
      )}
    </Group>
  );

  if (!AIAnswer.enabled) return;

  return (
    <Flex direction='column'>
      <Flex align='center' gap='sm' mt='xs'>
        <Select
          // label="Select provider"
          w={280}
          renderOption={renderSelectOptionProvider}
          leftSection={getIconProvider(AIAnswer.provider)}
          data={providerData}
          value={AIAnswer.provider}
          onChange={(val) => {
            if (val) {
              setAIAnswer({ provider: val as IAIProvider });

              if (val === 'cf') {
                setAIAnswer({
                  model: {
                    label: 'Llama 3.1 8b ( instruct, fast )',
                    value: '@cf/meta/llama-3.1-8b-instruct-fast',
                  },
                });
              }
              if (val === 'google') {
                setAIAnswer({
                  model: {
                    label: 'Gemini 2.0 Flash',
                    value: 'gemini-2.0-flash',
                  },
                });
              }
            }
          }}
        />
        <Text ml='sm'>Provider</Text>
      </Flex>

      <Flex align='center' gap='sm' mt='xs'>
        <Select
          // label="Model"
          w={280}
          renderOption={renderSelectOptionModel}
          leftSection={getAIChatModelIcon(AIAnswer.model.value, 16)}
          data={modelData}
          value={AIAnswer.model.value}
          onChange={(val) => {
            if (val && modelData) {
              let found;

              for (const group of modelData) {
                const foundItem = group.items.find((item) => item.value === val);
                if (foundItem) {
                  found = foundItem;
                }
              }

              if (found) {
                setAIAnswer({
                  model: {
                    label: found.label,
                    value: found.value,
                  },
                });
              }
            }
          }}
        />

        <Text ml='sm'>Model</Text>
      </Flex>
    </Flex>
  );
};

export default MoreAIAnswerOptions;
