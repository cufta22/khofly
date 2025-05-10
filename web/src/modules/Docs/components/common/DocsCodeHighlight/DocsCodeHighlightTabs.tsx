import "highlight.js/styles/tokyo-night-dark.css";
// import "highlight.js/styles/github.css";

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
  UnstyledButton,
  createVarsResolver,
  rem,
  useProps,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { FileIcon } from "./FileIcon";
import { ExpandIcon } from "./ExpandIcon";
import { CopyIcon } from "./CopyIcon";

import clsx from "clsx";
import classes from "./styles.module.scss";
import themeClasses from "./theme.module.scss";
import hljs from "./hljs";

export type CodeHighlightTabsStylesNames =
  | "root"
  | "code"
  | "codeWrapper"
  | "showCodeButton"
  | "pre"
  | "controls"
  | "control"
  | "header"
  | "file"
  | "files"
  | "fileIcon";

export type CodeHighlightTabsCssVariables = {
  root: "--ch-max-collapsed-height";
};

export interface CodeHighlightTabsCode {
  language?: string;
  code: string;
  fileName?: string;
  icon?: React.ReactNode;
}

export interface CodeHighlightTabsProps
  extends BoxProps,
    StylesApiProps<CodeHighlightTabsFactory>,
    ElementProps<"div"> {
  code: CodeHighlightTabsCode | CodeHighlightTabsCode[];
  defaultActiveTab?: number;
  activeTab?: number;
  onTabChange?: (tab: number) => void;
  withHeader?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  getFileIcon?: (fileName: string) => React.ReactNode;
  maxCollapsedHeight?: React.CSSProperties["maxHeight"];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  expandCodeLabel?: string;
  collapseCodeLabel?: string;
  withExpandButton?: boolean;
  withCopyButton?: boolean;
}

export type CodeHighlightTabsFactory = Factory<{
  props: CodeHighlightTabsProps;
  ref: HTMLDivElement;
  stylesNames: CodeHighlightTabsStylesNames;
}>;

const defaultProps: Partial<CodeHighlightTabsProps> = {
  withHeader: true,
  copyLabel: "Copy code",
  copiedLabel: "Copied",
  maxCollapsedHeight: rem("8rem"),
  expandCodeLabel: "Expand code",
  collapseCodeLabel: "Collapse code",
  withCopyButton: true,
};

const varsResolver = createVarsResolver<CodeHighlightTabsFactory>((_, { maxCollapsedHeight }) => ({
  root: { "--ch-max-collapsed-height": rem(maxCollapsedHeight) },
}));

const DocsCodeHighlightTabs: React.FC<CodeHighlightTabsProps> = (_props) => {
  const props = useProps("CodeHighlightTabs", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    code,
    defaultActiveTab,
    activeTab,
    onTabChange,
    withHeader,
    copiedLabel,
    copyLabel,
    getFileIcon,
    maxCollapsedHeight,
    expanded,
    defaultExpanded,
    onExpandedChange,
    expandCodeLabel,
    collapseCodeLabel,
    withExpandButton,
    withCopyButton,
    mod,
    ...others
  } = props;

  const [value, setValue] = useUncontrolled({
    defaultValue: defaultActiveTab,
    value: activeTab,
    finalValue: 0,
    onChange: onTabChange,
  });

  const [_expanded, setExpanded] = useUncontrolled({
    defaultValue: defaultExpanded,
    value: expanded,
    finalValue: true,
    onChange: onExpandedChange,
  });

  const nodes = Array.isArray(code) ? code : [code];
  const currentCode = nodes[value];

  const highlighted = hljs.highlight(currentCode.code.trim(), {
    language: currentCode.language || "bash",
  }).value;

  const files = nodes.map((node, index) => (
    <UnstyledButton
      className={classes.file}
      key={node.fileName}
      mod={{ active: index === value }}
      onClick={() => setValue(index)}
    >
      <FileIcon
        fileIcon={node.icon}
        getFileIcon={getFileIcon}
        fileName={node.fileName}
        className={classes.fileIcon}
      />
      <span>{node.fileName}</span>
    </UnstyledButton>
  ));

  return (
    <Box
      mod={[{ collapsed: !_expanded }, mod]}
      {...others}
      dir="ltr"
      className={clsx(classes.root, themeClasses.theme)}
    >
      {withHeader && (
        <div className={classes.docs_header}>
          <ScrollArea type="never" dir="ltr" offsetScrollbars={false}>
            <div className={classes.files}>{files}</div>
          </ScrollArea>
          <div className={classes.controls}>
            {withExpandButton && (
              <Tooltip
                label={_expanded ? collapseCodeLabel : expandCodeLabel}
                fz="sm"
                position="left"
              >
                <ActionIcon
                  onClick={() => setExpanded(!_expanded)}
                  variant="none"
                  aria-label={_expanded ? collapseCodeLabel : expandCodeLabel}
                  className={classes.control}
                >
                  <ExpandIcon expanded={_expanded} />
                </ActionIcon>
              </Tooltip>
            )}

            {withCopyButton && (
              <CopyButton value={currentCode.code.trim()}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? copiedLabel : copyLabel} fz="sm" position="left">
                    <ActionIcon
                      onClick={copy}
                      variant="transparent"
                      className={classes.control}
                      aria-label={copied ? copiedLabel : copyLabel}
                    >
                      <CopyIcon copied={copied} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            )}
          </div>
        </div>
      )}

      <ScrollArea type="auto" dir="ltr" offsetScrollbars={false}>
        <Box className={classes.codeWrapper} mod={{ expanded: _expanded }}>
          <pre className={classes.pre}>
            <code className={classes.code} dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </Box>
      </ScrollArea>
      <UnstyledButton
        className={classes.showCodeButton}
        mod={{ hidden: _expanded }}
        onClick={() => setExpanded(true)}
      >
        {expandCodeLabel}
      </UnstyledButton>
    </Box>
  );
};

export default DocsCodeHighlightTabs;
