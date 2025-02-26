import { Badge, Blockquote, Code, Flex } from "@mantine/core";
import DocsTitle from "../../common/DocsTitle";
import DocsText from "../../common/DocsText";
import DocsSubtitle from "../../common/DocsSubtitle";
import { IconBrandDebian } from "@tabler/icons-react";

const scripts = `
apt update && apt upgrade

apt install git 
`;

const SectionVPS = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <DocsTitle>Deploying to a VPS</DocsTitle>

        <Flex align="center" gap="sm">
          <Badge size="lg" color="green" variant="light">
            Recommended
          </Badge>

          <Badge size="lg" color="red" variant="light">
            ~5$/month
          </Badge>
        </Flex>
      </Flex>

      <Blockquote color="red" mt="xl" radius="sm" icon={<IconBrandDebian />}>
        install.sh works on debian only, for now. If you're running any other system move to manual
        installation steps and find replacements for the used packages.
      </Blockquote>

      <DocsText>Requirements: a VPS</DocsText>

      <DocsSubtitle>OPTION 1. Install script ( Recommended )</DocsSubtitle>

      <DocsText>
        1. SSH into your VPS and create an empty folder in your home directory, ex.{" "}
        <Code>mkdir khofly</Code>.
      </DocsText>

      <DocsText>
        2. <Code>cd khofly</Code> and type{" "}
        <Code>git clone https://github.com/cufta22/khofly.git .</Code>
      </DocsText>

      <DocsText>
        3. Once the code is fetched, make sure that you can execute the install script{" "}
        <Code>chmod +x ./scripts/install.sh</Code>
      </DocsText>

      <DocsText>
        3.1. Don't blindly trust any script you pull from the internet, you can inspect it with{" "}
        <Code>cat ./scripts/install.sh</Code>
      </DocsText>

      <DocsText>
        4. Now you can run the script with <Code>sudo ./scripts/install.sh</Code>
      </DocsText>

      <DocsText>5. If you didn't get any errors, the installation was successful.</DocsText>

      <DocsSubtitle>OPTION 2. Manual installation</DocsSubtitle>

      <DocsText>
        1. SSH into your VPS and create an empty folder in your home directory, ex.{" "}
        <Code>mkdir khofly</Code>.
      </DocsText>
    </>
  );
};

export default SectionVPS;
