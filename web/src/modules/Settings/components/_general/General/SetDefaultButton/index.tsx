import RemixLink from "@components/RemixLink";
import { useTranslate } from "@hooks/translate/use-translate";
import { Button } from "@mantine/core";
import commonClasses from "../../../common/styles.module.scss";

const SetDefaultButton = () => {
  const t = useTranslate();

  return (
    <RemixLink className={commonClasses.settings_control} to="/docs/set-default">
      <Button variant="outline">{t("pages.settings.general.set_as_default_btn")}</Button>
    </RemixLink>
  );
};

export default SetDefaultButton;
