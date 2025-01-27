import DocsText from "../../common/DocsText";
import DocsLink from "../../common/DocsLink";
import { Text } from "@mantine/core";
import RemixLink from "@components/RemixLink";

const SectionSafari = () => {
  return (
    <>
      <DocsText>1. Take a deep breath.</DocsText>

      <DocsText>1.1. Ask Apple® for permission to install Firefox.</DocsText>

      <DocsText>
        2. Open Firefox{" "}
        <DocsLink
          href="https://www.mozilla.org/en-US/firefox/new/"
          label="download page"
        />{" "}
        and proceed with installation.
      </DocsText>

      <DocsText>
        3. Once the installation is finished follow the steps from{" "}
        <RemixLink to={"/docs/set-default?browser=Firefox"}>
          <Text component="span" c="blue">
            this page
          </Text>
        </RemixLink>
      </DocsText>
    </>
  );
};

export default SectionSafari;
