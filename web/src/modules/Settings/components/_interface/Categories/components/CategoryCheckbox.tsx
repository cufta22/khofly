import { Text, UnstyledButton } from "@mantine/core";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";

interface CategoryCheckboxProps {
  checked: boolean;
  defaultChecked?: boolean;
  onChange(checked: boolean, id: string): void;
  id: string;
  title: string;
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
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>
    </UnstyledButton>
  );
}
