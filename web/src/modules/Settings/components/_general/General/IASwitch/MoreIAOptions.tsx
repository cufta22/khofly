import { Flex, Select, Switch, Text } from "@mantine/core";
import { IWeatherSource } from "@store/instance";
import { useSettingsStore } from "@store/settings";

const MoreIAOptions = () => {
  const instantAnswers = useSettingsStore((state) => state.instantAnswers);
  const setInstantAnswers = useSettingsStore((state) => state.setInstantAnswers);

  if (!instantAnswers.enabled) return;

  return (
    <Flex direction="column">
      <Flex align="center" gap="sm" mt="xs">
        <Select
          // label="Weather data source"
          //description="Pick one based on accuracy"
          size="sm"
          w={150}
          placeholder="Weather data source"
          value={instantAnswers.weatherDataSource}
          onChange={(val) => {
            setInstantAnswers({ weatherDataSource: val as IWeatherSource });
          }}
          data={[
            {
              label: "OpenWeather",
              value: "owm",
            },
            {
              label: "Open-Meteo",
              value: "om",
            },
          ]}
        />

        <Text ml="sm">Weather data source</Text>
      </Flex>
    </Flex>
  );
};

export default MoreIAOptions;
