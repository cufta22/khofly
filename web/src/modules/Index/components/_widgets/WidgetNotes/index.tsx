import { Flex, Paper, ScrollArea, Text, Textarea } from "@mantine/core";
import classes from "./styles.module.scss";

import { useStatrpageStore } from "@store/startpage";

const WidgetNotes = () => {
  const notes = useStatrpageStore((state) => state.notes);
  const setNotes = useStatrpageStore((state) => state.setNotes);

  return (
    <Paper className={classes.widget_notes} withBorder p="lg">
      <ScrollArea h={"100%"} type="never">
        <Flex direction="column" align="center">
          <Text fz={26} fw="bold" mb="md">
            Notes
          </Text>

          <Textarea
            classNames={{
              root: classes.textarea_root,
              input: classes.textarea_input,
            }}
            size="md"
            variant="unstyled"
            autosize
            minRows={7}
            c="black"
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
          />
        </Flex>
      </ScrollArea>
    </Paper>
  );
};

export default WidgetNotes;
