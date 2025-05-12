import {
  ActionIcon,
  Box,
  type BoxProps,
  CopyButton,
  type ElementProps,
  type Factory,
  Flex,
  ScrollArea,
  type StylesApiProps,
  Text,
  useProps,
} from "@mantine/core";
import themeClasses from "@module/Docs/components/common/DocsCodeHighlight/theme.module.scss";
import classes from "@module/Docs/components/common/DocsCodeHighlight/styles.module.scss";
import hljs from "./hljs";
import clsx from "clsx";
import { CopyIcon } from "@module/Docs/components/common/DocsCodeHighlight/CopyIcon";
import { getChatLangName, getChatSupportedLang } from "./utils";

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

const ChatCodeHighlight: React.FC<CodeHighlightProps> = (_props) => {
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

  const highlighted = hljs.highlight(code.trim(), {
    language: getChatSupportedLang(language),
  }).value;

  const { langIcon, langName } = getChatLangName(language);
  const LangIcon = langIcon;

  return (
    <Box className={clsx(classes.root, themeClasses.theme)} {...others} dir="ltr">
      <Flex className={classes.chat_header} p="sm" justify="space-between">
        <Flex gap="xs">
          {LangIcon && <LangIcon />}
          <Text fw="bold">{langName}</Text>
        </Flex>

        <CopyButton value={code.trim()}>
          {({ copied, copy }) => (
            <ActionIcon onClick={copy} variant="light">
              <CopyIcon copied={copied} />
            </ActionIcon>
          )}
        </CopyButton>
      </Flex>

      <ScrollArea type="hover" dir="ltr" offsetScrollbars={false}>
        <pre className={classes.pre}>
          <code className={classes.code} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </ScrollArea>
    </Box>
  );
};

export default ChatCodeHighlight;
