import { Switch } from "@mantine/core";
import { useStatrpageStore } from "@store/startpage";
import commonClasses from "../../../common/styles.module.scss";

interface Props {
  isM?: boolean;
}

const SurpriseMeSwitch: React.FC<Props> = ({ isM }) => {
  const displaySurpriseButton = useStatrpageStore((state) => state.displaySurpriseButton);
  const setDisplaySurpriseButton = useStatrpageStore((state) => state.setDisplaySurpriseButton);

  const setDisplayShortcuts = useStatrpageStore((state) => state.setDisplayShortcuts);

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
