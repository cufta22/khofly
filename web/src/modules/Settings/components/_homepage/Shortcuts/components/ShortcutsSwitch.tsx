import { Switch } from '@mantine/core';
import { useHomepageStore } from '@store/homepage';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
}

const ShortcutsSwitch: React.FC<Props> = ({ isM }) => {
  const displayShortcuts = useHomepageStore((state) => state.displayShortcuts);
  const setDisplayShortcuts = useHomepageStore((state) => state.setDisplayShortcuts);

  const setDisplaySurpriseButton = useHomepageStore((state) => state.setDisplaySurpriseButton);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={displayShortcuts}
      onChange={(e) => {
        setDisplayShortcuts(e.currentTarget.checked);

        // Uncheck Surprise Me! if enabled
        if (e.currentTarget.checked) setDisplaySurpriseButton(false);
      }}
      withThumbIndicator={isM ? false : true}
      size={isM ? 'md' : 'sm'}
    />
  );
};

export default ShortcutsSwitch;
