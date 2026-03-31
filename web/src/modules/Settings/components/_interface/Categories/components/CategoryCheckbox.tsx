import { Text, UnstyledButton } from "@mantine/core";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useTranslate } from "@hooks/translate/use-translate";
import { DotNestedKeys, ITranslations } from "@ts/global.types";

interface CategoryCheckboxProps {
  checked: boolean;
  defaultChecked?: boolean;
  onChange(checked: boolean, id: string): void;
  id: string;
  title: DotNestedKeys<ITranslations>;
  icon: any;
}

export function CategoryCheckbox({
  checked,
  defaultChecked,
  onChange,
  id,
  title,
  className,
  icon,
  ...others
}: CategoryCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof CategoryCheckboxProps>) {
  const t = useTranslate();
  const Icon = icon;

  return (
    <UnstyledButton
      {...others}
      onClick={() => onChange(!checked, id)}
      data-checked={checked || undefined}
      aria-selected={checked || undefined}
      className={classes.button}
    >
      {/* <Image src={image} alt={title} width={40} height={40} /> */}
      <Icon style={getIconStyle(20)} />

      <div className={classes.body}>
        <Text className={classes.text} fw={500} size="sm" lh={1}>
          {t(title)}
        </Text>
      </div>
    </UnstyledButton>
  );
}
