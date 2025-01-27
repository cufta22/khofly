import { Anchor, Text } from "@mantine/core";
import React from "react";

interface Props {
  href: string;
  label: string;
}

const DocsLink: React.FC<Props> = ({ href, label }) => {
  return (
    <>
      {" "}
      <Text component="span" c="blue.4">
        <Anchor href={href} target="_blank" rel="noreferrer noopener">
          {label}
        </Anchor>
      </Text>
    </>
  );
};

export default DocsLink;
