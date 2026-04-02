import { Switch } from '@mantine/core';
import { useSettingsStore } from '@store/settings';
import commonClasses from '../../../common/styles.module.scss';

interface Props {
  isM?: boolean;
}

const ShowEnginesSwitch: React.FC<Props> = ({ isM }) => {
  const showEngines = useSettingsStore((state) => state.showEngines);
  const setShowEngines = useSettingsStore((state) => state.setShowEngines);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={showEngines}
      onChange={(e) => setShowEngines(e.currentTarget.checked)}
      withThumbIndicator={isM ? false : true}
      size={isM ? 'md' : 'sm'}
    />
  );
};

export default ShowEnginesSwitch;
