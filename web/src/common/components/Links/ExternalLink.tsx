import {
  Anchor,
  Text,
  useMantineTheme,
  type AnchorProps,
  type PolymorphicComponentProps,
} from "@mantine/core";
import type { IFC } from "@ts/global.types";

interface Props extends PolymorphicComponentProps<"a", AnchorProps>, IFC {}

const ExternalLink: React.FC<Props> = ({ children, ...linkProps }) => {
  const theme = useMantineTheme();

  return (
    <Anchor {...linkProps} target="_blank" rel="noreferrer noopener">
      <Text component="span" c={theme.colors[theme.primaryColor][4]}>
        {children}
      </Text>
    </Anchor>
  );
};

export default ExternalLink;
