import { useState } from "react";
import { IAWrapper } from "../../wrapper";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { LANG_DATA_1, LANG_DATA_2 } from "./data";
import { IconLanguage, IconSwitchHorizontal } from "@tabler/icons-react";

import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import useTranslateSWR from "src/api/translate/use-translate-query";
import useToast from "@hooks/use-toast";

const IATranslate = () => {
  const { trigger, isMutating } = useTranslateSWR();
  const { toast } = useToast();

  const [lang1, setLang1] = useState("auto");
  const [lang2, setLang2] = useState("en");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSwapLanguages = () => {
    const newLang1 = lang2;
    const newLang2 = lang1;
    setLang1(newLang1);
    setLang2(newLang2);
  };

  const handleSubmit = async () => {
    if (!input1 || !lang1 || !lang2) return;

    const res = await trigger({
      data: input1,
      from: lang1,
      to: lang2,
    });

    if (res?.translated_text) setInput2(res?.translated_text);

    if (!res?.translated_text)
      toast.show({
        color: "yellow",
        message: "Translation error",
      });
  };

  return (
    <IAWrapper>
      <Flex direction="row" align="center" justify="space-between" mb="sm">
        <Flex align="center" gap={6}>
          <IconLanguage style={getIconStyle(26)} />

          <Text size="lg" fw={600}>
            Translate
          </Text>
        </Flex>

        <Button size="xs" onClick={handleSubmit} disabled={!input1 || !lang1 || !lang2}>
          Translate
        </Button>
      </Flex>

      {/* Language select */}
      <Flex direction="row" align="flex-start" justify="space-between" gap="sm">
        <Select
          className={classes.flex_side}
          data={LANG_DATA_1}
          value={lang1}
          onChange={(val) => setLang1(val || "")}
          mb="md"
          searchable
        />

        <ActionIcon variant="subtle" onClick={handleSwapLanguages} mt={4}>
          <IconSwitchHorizontal />
        </ActionIcon>

        <Select
          className={classes.flex_side}
          data={LANG_DATA_2}
          value={lang2}
          onChange={(val) => setLang2(val || "")}
          mb="md"
          searchable
        />
      </Flex>

      <Flex className={classes.flex_mobile} align="flex-start" justify="space-between">
        {/* User input */}
        <Textarea
          classNames={{
            root: classes.textarea,
            input: classes.textarea,
          }}
          value={input1}
          onChange={(e) => setInput1(e.currentTarget.value)}
          placeholder="Enter text"
          variant="default"
          size="md"
        />

        {/* API output */}
        <Box className={classes.output_box} pos="relative">
          <Textarea
            classNames={{
              root: classes.textarea,
              input: classes.textarea,
            }}
            value={input2}
            placeholder="Translation"
            variant="filled"
            size="md"
            readOnly
          />

          <LoadingOverlay
            visible={isMutating}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
      </Flex>
    </IAWrapper>
  );
};

export default IATranslate;
