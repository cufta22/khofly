import { Flex, Paper, Stack, Text } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import { ICategories, useSettingsStore } from "@store/settings";
import ParseVercelID from "./ParseVercelID";
import classes from "./styles.module.scss";

const SettingsDevelopment = () => {
  const { categories, setCategories } = useSettingsStore((state) => ({
    categories: state.categories,
    setCategories: state.setCategories,
  }));

  const handleChangeCategories = (next: boolean, id: ICategories) => {
    let newCategories = [];

    if (next) {
      newCategories = [...categories, id];
    } else {
      newCategories = categories.filter((eng) => eng !== id);
    }

    setCategories(newCategories);
  };

  return (
    <Paper radius="md" withBorder mt={40}>
      <Flex align="center" p="lg" mb={16}>
        <IconCode size={32} />

        <Text fz={26} fw={600} ml="sm">
          Development
        </Text>
      </Flex>

      {/* Settings content */}
      <Stack w="100%" align="start" px="lg" mb="xl">
        <Flex w="100%" className={classes.flex_row} justify="space-between">
          <Flex align="center" gap="sm">
            <Text size="md" fw={400}>
              Parse Vercel ID
            </Text>
          </Flex>

          <ParseVercelID />
        </Flex>
      </Stack>
    </Paper>
  );
};

export default SettingsDevelopment;
