import WikiText from "../../common/WikiText";
import WikiLink from "../../common/WikiLink";
import { IconInfoCircle } from "@tabler/icons-react";
import { Alert, Code } from "@mantine/core";
import WikiSubtitle from "../../common/WikiSubtitle";
import { CodeHighlight } from "@mantine/code-highlight";
import WikiTitle from "../../common/WikiTitle";

const envVars = `
HOST = # your domain, either set a custom domain or Vercel auto assigned one

SEARXNG_URL_DEFAULT = # url for your SearXNG instance

NOMINATIM_URL = https://nominatim.openstreetmap.org 

OPEN_WEATHER_URL = https://api.openweathermap.org
OPEN_WEATHER_API_KEY = # Your API key if you want to use weather IA

IS_SELF_HOST = 1
APP_NAME = YourApp # Will be used instead of "Khofly" across the app
HOST_TARGET = vercel
`;

const SectionVercel = () => {
  return (
    <>
      <WikiTitle>Deploying to Vercel</WikiTitle>

      <WikiSubtitle>1. Clone Khofly repo on your machine</WikiSubtitle>

      <WikiText>
        Type <Code>git clone https://github.com/cufta22/khofly.git .</Code> in
        an empty folder on your system.
      </WikiText>

      <WikiSubtitle>
        2. Create an empty repository on your git provider account
      </WikiSubtitle>

      <WikiSubtitle>3. Push your code</WikiSubtitle>

      <WikiText>
        Push your local Khofly code to your newly created repository and Vercel
        should handle the deployment for you automatically
      </WikiText>

      <WikiSubtitle>
        4. Create a new project on Vercel and connect it to your git repository
      </WikiSubtitle>

      <WikiText>
        Once the project is created go to Settings/General and make sure the
        Output Directory is set to <Code>build</Code>
      </WikiText>

      <WikiText>
        Now go into Settings/Environment Variables and make sure to set the
        following:
      </WikiText>

      <CodeHighlight code={envVars} language="shell" />

      <WikiSubtitle>
        5. Redeploy Vercel project so that env variables set in
      </WikiSubtitle>

      <WikiTitle>Updating Khofly version</WikiTitle>

      <WikiSubtitle>1. Get the latest code</WikiSubtitle>

      <WikiText>
        Open the folder where you originally cloned Khofly and run{" "}
        <Code>git pull origin master</Code>, after this push the code to your
        hosted repository and Vercel will automatically redeploy your app.
      </WikiText>

      <Alert
        mt="xl"
        variant="light"
        color="blue"
        title="Learn more"
        icon={<IconInfoCircle />}
      >
        You can read more about deploying a Remix site to Vercel at{" "}
        <WikiLink
          href="https://vercel.com/guides/deploying-remix-with-vercel"
          label="official docs"
        />
        .
      </Alert>
    </>
  );
};

export default SectionVercel;
