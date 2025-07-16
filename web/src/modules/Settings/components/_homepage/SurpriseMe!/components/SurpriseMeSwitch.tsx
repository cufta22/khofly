import { Switch } from "@mantine/core";
import { useHomepageStore } from "@store/homepage";
import commonClasses from "../../../common/styles.module.scss";

interface Props {
  isM?: boolean;
}

const SurpriseMeSwitch: React.FC<Props> = ({ isM }) => {
  const displaySurpriseButton = useHomepageStore((state) => state.displaySurpriseButton);
  const setDisplaySurpriseButton = useHomepageStore((state) => state.setDisplaySurpriseButton);

  const setDisplayShortcuts = useHomepageStore((state) => state.setDisplayShortcuts);

  return (
    <Switch
      className={commonClasses.settings_control}
      checked={displaySurpriseButton}
      onChange={(e) => {
        setDisplaySurpriseButton(e.currentTarget.checked);

        // Uncheck Shortcuts if enabled
        if (e.currentTarget.checked) setDisplayShortcuts(false);
      }}
      withThumbIndicator={isM ? false : true}
      size={isM ? "md" : "sm"}
    />
  );
};

export default SurpriseMeSwitch;
