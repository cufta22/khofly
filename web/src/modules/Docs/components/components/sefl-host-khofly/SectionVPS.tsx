import { Badge, Flex } from "@mantine/core";
import DocsTitle from "../../common/DocsTitle";
import DocsText from "../../common/DocsText";

const scripts = `
apt update && apt upgrade

apt install git 
`;

const SectionVPS = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <DocsTitle>Deploying to a VPS</DocsTitle>

        <Badge size="lg" color="red" variant="light">
          ~5$/month
        </Badge>
      </Flex>

      <DocsText>test</DocsText>
    </>
  );
};

export default SectionVPS;
