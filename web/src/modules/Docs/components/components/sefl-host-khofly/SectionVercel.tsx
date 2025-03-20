import DocsText from "../../common/DocsText";
import DocsLink from "../../common/DocsLink";
import { IconInfoCircle } from "@tabler/icons-react";
import { Alert, Badge, Code, Flex, Paper } from "@mantine/core";
import DocsSubtitle from "../../common/DocsSubtitle";
import DocsTitle from "../../common/DocsTitle";
import DocsCodeHighlight from "../../common/DocsCodeHighlight/DocsCodeHighlight";

const envVars = `
HOST = # your domain, either set a custom domain or Vercel auto assigned one

SEARXNG_URL_SELF_HOST = # url for your SearXNG instance

API_URL_SELF_HOST = # url for your hosted API

NOMINATIM_URL = https://nominatim.openstreetmap.org 

IS_SELF_HOST = 1
APP_NAME = YourApp # Will be used instead of "Khofly" across the app
HOST_TARGET = vercel
`;

const SectionVercel = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <DocsTitle>Deploying to Vercel</DocsTitle>

        <Flex align="center" gap="sm">
          <Badge size="lg" color="green" variant="light">
            Has free tier
          </Badge>
        </Flex>
      </Flex>

      <DocsSubtitle>1. Clone Khofly repo on your machine</DocsSubtitle>

      <DocsText>
        Type <Code>git clone https://github.com/cufta22/khofly.git .</Code> in an empty folder on
        your system.
      </DocsText>

      <DocsSubtitle>2. Create an empty repository on your git provider account</DocsSubtitle>

      <DocsSubtitle>3. Push your code</DocsSubtitle>

      <DocsText>
        Push your local Khofly code to your newly created repository and Vercel should handle the
        deployment for you automatically
      </DocsText>

      <DocsSubtitle>
        4. Create a new project on Vercel and connect it to your git repository
      </DocsSubtitle>

      <DocsText>
        The Root Directory needs to be set to <Code>web</Code>
      </DocsText>

      <DocsText>
        Once the project is created go to Settings/General and make sure the Output Directory is set
        to <Code>build</Code>
      </DocsText>

      <DocsText>
        Now go into Settings/Environment Variables and make sure to set the following:
      </DocsText>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={envVars} language="bash" />
      </Paper>

      <DocsSubtitle>5. Redeploy Vercel project so that env variables set in</DocsSubtitle>

      <DocsTitle>Updating Khofly version</DocsTitle>

      <DocsSubtitle>1. Get the latest code</DocsSubtitle>

      <DocsText>
        Open the folder where you originally cloned Khofly and run{" "}
        <Code>git pull origin master</Code>, after this push the code to your hosted repository and
        Vercel will automatically redeploy your app.
      </DocsText>

      <Alert mt="xl" variant="light" color="blue" title="Learn more" icon={<IconInfoCircle />}>
        You can read more about deploying a React Router app to Vercel at{" "}
        <DocsLink
          href="https://https://vercel.com/docs/frameworks/react-router"
          label="official docs"
        />
        .
      </Alert>
    </>
  );
};

export default SectionVercel;
