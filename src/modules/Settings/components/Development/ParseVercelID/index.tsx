import RemixLink from "@components/RemixLink";
import { Flex, Switch, Text } from "@mantine/core";
import { useSettingsStore } from "@store/settings";

const ParseVercelID = () => {
  const { useInstantAnswers, setUseInstantAnswers } = useSettingsStore(
    (state) => ({
      useInstantAnswers: state.useInstantAnswers,
      setUseInstantAnswers: state.setUseInstantAnswers,
    })
  );

  return (
    <Flex align="center" gap="sm">
      <Text component="span" c="blue.4">
        <RemixLink to="/docs/instant-answers" target="_blank">
          Parse Vercel ID
        </RemixLink>
      </Text>

      <Switch
        checked={useInstantAnswers}
        onChange={(e) => setUseInstantAnswers(e.currentTarget.checked)}
      />
    </Flex>
  );
};

export default ParseVercelID;
