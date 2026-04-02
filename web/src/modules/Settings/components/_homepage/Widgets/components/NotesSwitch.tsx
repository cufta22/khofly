import { Switch } from '@mantine/core';
import { useHomepageStore } from '@store/homepage';

const NotesSwitch = () => {
  const displayNotes = useHomepageStore((state) => state.displayNotes);
  const setDisplayNotes = useHomepageStore((state) => state.setDisplayNotes);

  return (
    <Switch checked={displayNotes} onChange={(e) => setDisplayNotes(e.currentTarget.checked)} />
  );
};

export default NotesSwitch;
