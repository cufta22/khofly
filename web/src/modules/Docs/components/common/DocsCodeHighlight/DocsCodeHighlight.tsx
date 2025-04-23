import {
  ActionIcon,
  Box,
  type BoxProps,
  CopyButton,
  type ElementProps,
  type Factory,
  ScrollArea,
  type StylesApiProps,
  Tooltip,
  useProps,
} from "@mantine/core";
import { CopyIcon } from "./CopyIcon";
import classes from "./styles.module.scss";
import themeClasses from "./theme.module.scss";
import hljs from "./hljs";
import clsx from "clsx";

export type CodeHighlightStylesNames = "root" | "code" | "pre" | "copy";

export interface CodeHighlightProps
  extends BoxProps,
    StylesApiProps<CodeHighlightFactory>,
    ElementProps<"div"> {
  code: string;
  language: string;
  withCopyButton?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  highlightOnClient?: boolean;
}

export type CodeHighlightFactory = Factory<{
  props: CodeHighlightProps;
  ref: HTMLDivElement;
  stylesNames: CodeHighlightStylesNames;
}>;

const defaultProps: Partial<CodeHighlightProps> = {
  copyLabel: "Copy code",
  copiedLabel: "Copied",
  language: "bash",
  withCopyButton: true,
};

const DocsCodeHighlight: React.FC<CodeHighlightProps> = (_props) => {
  const props = useProps("CodeHighlight", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    code,
    copiedLabel,
    copyLabel,
    language,
    withCopyButton,
    highlightOnClient,
    ...others
  } = props;

  const highlighted = hljs.highlight(code.trim(), { language }).value;

  return (
    <Box className={clsx(classes.root, themeClasses.theme)} {...others} dir="ltr">
      {withCopyButton && (
        <CopyButton value={code.trim()}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? copiedLabel : copyLabel} fz="sm" position="left">
              <ActionIcon onClick={copy} variant="none" className={classes.copy}>
                <CopyIcon copied={copied} />
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      )}

      <ScrollArea type="hover" dir="ltr" offsetScrollbars={false}>
        <pre className={classes.pre}>
          <code className={classes.code} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </ScrollArea>
    </Box>
  );
};

export default DocsCodeHighlight;
