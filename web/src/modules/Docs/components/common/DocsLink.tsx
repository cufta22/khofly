import { usePrimaryColor } from "@hooks/use-primary-color";
import { Anchor, Text, useMantineTheme } from "@mantine/core";

interface Props {
  href: string;
  label: string;
}

const DocsLink: React.FC<Props> = ({ href, label }) => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <>
      {" "}
      <Anchor href={href} target="_blank" rel="noreferrer noopener">
        <Text component="span" c={linkTextColor}>
          {label}
        </Text>
      </Anchor>
    </>
  );
};

export default DocsLink;
