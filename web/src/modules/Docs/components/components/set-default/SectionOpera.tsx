import DocsText from "../../common/DocsText";
import DocsLink from "../../common/DocsLink";
import { Text } from "@mantine/core";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";

const SectionOpera = () => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <>
      <DocsText>1. 深呼吸。</DocsText>

      <DocsText>
        2. 打开 Firefox{" "}
        <DocsLink href="https://www.mozilla.org/en-US/firefox/new/" label="download page" />{" "}
        并继续安装.
      </DocsText>

      <DocsText>
        3. 安装完成后，请按照以下步骤操作{" "}
        <RemixLink to={"/docs/set-default?browser=Firefox"}>
          <Text component="span" c={linkTextColor}>
            this page
          </Text>
        </RemixLink>
      </DocsText>
    </>
  );
};

export default SectionOpera;
