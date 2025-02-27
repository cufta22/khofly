import { Code, Container, Text } from "@mantine/core";
import React from "react";
import DocsTitle from "./common/DocsTitle";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsLink from "./common/DocsLink";
import RemixLink from "@components/RemixLink";
import { usePrimaryColor } from "@hooks/use-primary-color";

const DocsSelfHostResourceAPI = () => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Installation guide</DocsTitle>

      <DocsText>Requirements: a VPS</DocsText>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        This part is covered in{" "}
        <RemixLink to="/docs/self-host-khofly">
          <Text c={linkTextColor} component="span">
            docs/self-host-khofly
          </Text>
        </RemixLink>
        , the <Code>install.sh</Code> script installs and runs both the web client and api. If
        you've already run that script you don't need this page.
      </DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>Follow these steps only if you've manually installed Khofly web clien.</DocsText>

      <DocsText>1. </DocsText>
    </Container>
  );
};

export default DocsSelfHostResourceAPI;
