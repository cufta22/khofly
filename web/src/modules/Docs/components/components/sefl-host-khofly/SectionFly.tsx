import { Alert, Badge, Code, Flex, Paper } from "@mantine/core";
import DocsSubtitle from "../../common/DocsSubtitle";
import DocsText from "../../common/DocsText";
import DocsTitle from "../../common/DocsTitle";
import DocsLink from "../../common/DocsLink";
import { IconInfoCircle } from "@tabler/icons-react";
import DocsCodeHighlight from "../../common/DocsCodeHighlight/DocsCodeHighlight";
import classes from "./styles.module.scss";

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
RUN apt-get update -qq && apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

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
      <Flex className={classes.self_host_title_wrapper} align="center" justify="space-between">
        <DocsTitle>Deploying to Fly.io</DocsTitle>

        <Badge size="lg" color="pink" variant="light">
          Has 5$ free credit
        </Badge>
      </Flex>

      <DocsSubtitle>1. Clone Khofly repo on your machine</DocsSubtitle>

      <DocsText>
        Type <Code>git clone https://github.com/cufta22/khofly.git .</Code> in an empty folder on
        your system.
      </DocsText>

      <DocsSubtitle>2. Create an account on Fly.io and add a payment method</DocsSubtitle>

      <DocsText>
        It ain't free unfortunately but it gives you a lot of control, size of virtual machines,
        location, etc.
      </DocsText>

      <DocsSubtitle>3. flyctl magic</DocsSubtitle>

      <DocsText>
        Install flyctl, instructions{" "}
        <DocsLink href="https://fly.io/docs/hands-on/install-flyctl/" label="here" />, cross your
        fingers and run <Code>fly launch</Code>
      </DocsText>

      <DocsText>
        It will prompt you for virtual machine config, pick whatever suits you the best
      </DocsText>

      <DocsSubtitle>3.1 OPTIONAL if your Dockerfile errors out</DocsSubtitle>

      <DocsText>
        <Code>fly launch</Code> will generate a Dockerfile but the default one kept breaking for me
        ( maybe pnpm related ), so if it does for you as well try the one below
      </DocsText>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight
          code={flyDockerfile}
          language="docker"
          style={{ whiteSpace: "balance" }}
        />
      </Paper>

      <DocsTitle>Updating Khofly version</DocsTitle>

      <DocsSubtitle>1. Get the latest code</DocsSubtitle>

      <DocsText>
        Open the folder where you originally cloned Khofly and run{" "}
        <Code>git pull origin master</Code>, after this run <Code>fly deploy</Code> and it "should"
        redeploy the latest changes
      </DocsText>

      <Alert mt="xl" variant="light" color="blue" title="Learn more" icon={<IconInfoCircle />}>
        You can read more about deploying a React Router site to Fly.io at{" "}
        <DocsLink href="https://fly.io/docs/js/frameworks/remix/" label="official docs" />.
      </Alert>
    </>
  );
};

export default SectionFly;
