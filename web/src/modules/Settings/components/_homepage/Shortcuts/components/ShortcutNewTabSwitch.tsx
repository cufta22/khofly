import { Switch } from '@mantine/core';
import { useHomepageStore } from '@store/homepage';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
}

const ShortcutsNewTabSwitch: React.FC<Props> = ({ isM }) => {
  const openInNewTab = useHomepageStore((state) => state.openInNewTab);
  const setOpenInNewTab = useHomepageStore((state) => state.setOpenInNewTab);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={openInNewTab}
      onChange={(e) => {
        setOpenInNewTab(e.currentTarget.checked);
      }}
      withThumbIndicator={!isM}
      size={isM ? 'md' : 'sm'}
    />
  );
};

export default ShortcutsNewTabSwitch;
