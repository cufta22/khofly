import {
  Alert,
  Anchor,
  Button,
  Code,
  Collapse,
  Paper,
  Spoiler,
} from "@mantine/core";
import WikiSubtitle from "../../common/WikiSubtitle";
import WikiText from "../../common/WikiText";
import WikiTitle from "../../common/WikiTitle";
import { CodeHighlight } from "@mantine/code-highlight";
import WikiLink from "../../common/WikiLink";
import { IconInfoCircle } from "@tabler/icons-react";

const flyDockerfile = `
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.7.2
FROM node:\${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Remix"

# Remix app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json ./
RUN npm install --include=dev --legacy-peer-deps

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev --legacy-peer-deps


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
`;

const SectionFly = () => {
  return (
    <>
      <WikiTitle>Deploying to Fly.io</WikiTitle>

      <WikiSubtitle>1. Clone Khofly repo on your machine</WikiSubtitle>

      <WikiText>
        Type <Code>git clone https://github.com/cufta22/khofly.git .</Code> in
        an empty folder on your system.
      </WikiText>

      <WikiSubtitle>
        2. Create an account on Fly.io and add a payment method
      </WikiSubtitle>

      <WikiText>
        It ain't free unfortunately but it gives you a lot of control, size of
        virtual machines, location, etc.
      </WikiText>

      <WikiSubtitle>3. flyctl magic</WikiSubtitle>

      <WikiText>
        Install flyctl, instructions{" "}
        <WikiLink
          href="https://fly.io/docs/hands-on/install-flyctl/"
          label="here"
        />
        , cross your fingers and run <Code>fly launch</Code>
      </WikiText>

      <WikiText>
        It will prompt you for virtual machine config, pick whatever suits you
        the best
      </WikiText>

      <WikiSubtitle>3.1 OPTIONAL if your Dockerfile errors out</WikiSubtitle>

      <WikiText>
        <Code>fly launch</Code> will generate a Dockerfile but the default one
        kept breaking for me ( maybe pnpm related ), so if it does for you as
        well try the one below
      </WikiText>

      <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide" mb={60}>
        <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
          <CodeHighlight code={flyDockerfile} language="docker" />
        </Paper>
      </Spoiler>

      <WikiTitle>Updating Khofly version</WikiTitle>

      <WikiSubtitle>1. Get the latest code</WikiSubtitle>

      <WikiText>
        Open the folder where you originally cloned Khofly and run{" "}
        <Code>git pull origin master</Code>, after this run{" "}
        <Code>fly deploy</Code> and it "should" redeploy the latest changes
      </WikiText>

      <Alert
        mt="xl"
        variant="light"
        color="blue"
        title="Learn more"
        icon={<IconInfoCircle />}
      >
        You can read more about deploying a Remix site to Fly.io at{" "}
        <WikiLink
          href="https://fly.io/docs/js/frameworks/remix/"
          label="official docs"
        />
        .
      </Alert>
    </>
  );
};

export default SectionFly;
