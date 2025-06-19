import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";

const NotesSwitch = () => {
  const displayNotes = useStatrpageStore((state) => state.displayNotes);
  const setDisplayNotes = useStatrpageStore((state) => state.setDisplayNotes);

  return (
    <Switch checked={displayNotes} onChange={(e) => setDisplayNotes(e.currentTarget.checked)} />
  );
};

export default NotesSwitch;
