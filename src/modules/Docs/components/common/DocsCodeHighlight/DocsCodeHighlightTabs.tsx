import "highlight.js/styles/default.min.css";

import {
  ActionIcon,
  Box,
  BoxProps,
  CopyButton,
  ElementProps,
  Factory,
  ScrollArea,
  StylesApiProps,
  Tooltip,
  UnstyledButton,
  createVarsResolver,
  factory,
  rem,
  useProps,
  useStyles,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { FileIcon } from "./FileIcon";
import { ExpandIcon } from "./ExpandIcon";
import { CopyIcon } from "./CopyIcon";

import clsx from "clsx";
import _classes from "./styles.module.scss";
import themeClasses from "./theme.module.scss";

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

const varsResolver = createVarsResolver<CodeHighlightTabsFactory>(
  (_, { maxCollapsedHeight }) => ({
    root: { "--ch-max-collapsed-height": rem(maxCollapsedHeight) },
  })
);

const DocsCodeHighlightTabs = factory<CodeHighlightTabsFactory>(
  (_props, ref) => {
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

    const getStyles = useStyles<CodeHighlightTabsFactory>({
      name: "CodeHighlightTabs",
      props,
      classes,
      className,
      style,
      classNames,
      styles,
      unstyled,
      vars,
      varsResolver,
    });

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
      language: currentCode.language || "nginx",
    }).value;

    const files = nodes.map((node, index) => (
      <UnstyledButton
        {...getStyles("file")}
        key={node.fileName}
        mod={{ active: index === value }}
        onClick={() => setValue(index)}
      >
        <FileIcon
          fileIcon={node.icon}
          getFileIcon={getFileIcon}
          fileName={node.fileName}
          {...getStyles("fileIcon")}
        />
        <span>{node.fileName}</span>
      </UnstyledButton>
    ));

    return (
      <Box
        {...getStyles("root")}
        mod={[{ collapsed: !_expanded }, mod]}
        ref={ref}
        {...others}
        dir="ltr"
      >
        {withHeader && (
          <div {...getStyles("header")}>
            <ScrollArea type="never" dir="ltr" offsetScrollbars={false}>
              <div {...getStyles("files")}>{files}</div>
            </ScrollArea>
            <div {...getStyles("controls")}>
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
                    {...getStyles("control")}
                  >
                    <ExpandIcon expanded={_expanded} />
                  </ActionIcon>
                </Tooltip>
              )}

              {withCopyButton && (
                <CopyButton value={currentCode.code.trim()}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? copiedLabel : copyLabel}
                      fz="sm"
                      position="left"
                    >
                      <ActionIcon
                        onClick={copy}
                        variant="none"
                        {...getStyles("control")}
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
          <Box {...getStyles("codeWrapper")} mod={{ expanded: _expanded }}>
            <pre {...getStyles("pre")}>
              <code
                {...getStyles("code")}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          </Box>
        </ScrollArea>
        <UnstyledButton
          {...getStyles("showCodeButton")}
          mod={{ hidden: _expanded }}
          onClick={() => setExpanded(true)}
        >
          {expandCodeLabel}
        </UnstyledButton>
      </Box>
    );
  }
);

export default DocsCodeHighlightTabs;
