import {
  ActionIcon,
  Box,
  BoxProps,
  CopyButton,
  ElementProps,
  factory,
  Factory,
  ScrollArea,
  StylesApiProps,
  Tooltip,
  useProps,
  useStyles,
} from "@mantine/core";
import { CopyIcon } from "./CopyIcon";
import _classes from "./styles.module.scss";
import themeClasses from "./theme.module.scss";
import clsx from "clsx";

import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import nginx from "highlight.js/lib/languages/nginx";
import yaml from "highlight.js/lib/languages/yaml";
import shell from "highlight.js/lib/languages/shell";
import dockerfile from "highlight.js/lib/languages/dockerfile";
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("dockerfile", dockerfile);

const classes = { ..._classes, root: clsx(_classes.root, themeClasses.theme) };

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

const DocsCodeHighlight = factory<CodeHighlightFactory>((_props, ref) => {
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

  const getStyles = useStyles<CodeHighlightFactory>({
    name: "CodeHighlight",
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
  });

  const highlighted = hljs.highlight(code.trim(), { language }).value;

  return (
    <Box {...getStyles("root")} ref={ref} {...others} dir="ltr">
      {withCopyButton && (
        <CopyButton value={code.trim()}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? copiedLabel : copyLabel}
              fz="sm"
              position="left"
            >
              <ActionIcon onClick={copy} variant="none" {...getStyles("copy")}>
                <CopyIcon copied={copied} />
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      )}

      <ScrollArea type="hover" dir="ltr" offsetScrollbars={false}>
        <pre {...getStyles("pre")}>
          <code
            {...getStyles("code")}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </ScrollArea>
    </Box>
  );
});

export default DocsCodeHighlight;
