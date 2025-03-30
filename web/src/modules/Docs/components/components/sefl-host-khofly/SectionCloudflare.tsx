import { Badge, Flex } from "@mantine/core";
import DocsText from "../../common/DocsText";
import DocsTitle from "../../common/DocsTitle";
import classes from "./styles.module.scss";

const SectionCloudflare = () => {
  return (
    <>
      <Flex className={classes.self_host_title_wrapper} align="center" justify="space-between">
        <DocsTitle>Deploying to Cloudflare Pages</DocsTitle>

        <Badge size="lg" color="green" variant="light">
          Has free tier
        </Badge>
      </Flex>

      <DocsText>Can't get it to work :(</DocsText>
    </>
  );
};

export default SectionCloudflare;
