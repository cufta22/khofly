import { Blockquote, Code, Container, Image, List, Paper, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useState } from "react";
import DocsLink from "./common/DocsLink";
import DocsTitle from "./common/DocsTitle";
import DocsText from "./common/DocsText";
import DocsSubtitle from "./common/DocsSubtitle";
import DocsCodeHighlight from "./common/DocsCodeHighlight/DocsCodeHighlight";
import RemixLink from "@components/RemixLink";

const CODE_WORKER = `
const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS', 
  'Access-Control-Allow-Origin': 'https://khofly.com', // Replace if you need with appropriate domain 
};

export default {
  async fetch(request, env) {
    const { method } = request;

    const url = new URL(request.url); // Get the URL of the request
    const prompt = url.searchParams.get('prompt'); // Retrieve the 'prompt' query parameter

    if (request.method === "OPTIONS") {
      return new Response("OK", {
        headers: corsHeaders
      });
    }

    if (method !== "GET") {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    if (!prompt) return new Response('Prompt is missing', { status: 400 });;

    try {
      // Use the model that you want, speed might vary
      let response = await env.AI.run('@cf/meta/llama-3.2-1b-instruct', {
        prompt: prompt
      });
      return Response.json(response, {
        headers: corsHeaders
      });
    } catch (error) {
      // Handle error
      return new Response('Error: ' + error?.message, { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  }
};
  `;

const DocsSelfHostAiWorker = () => {
  return (
    <Container size="lg" p="xl" pb={100}>
      <DocsTitle>Setup guide</DocsTitle>

      <DocsText>
        1. Go to <DocsLink href="cloudflare.com" label="cloudflare.com" /> and log in.
      </DocsText>

      <DocsText>
        2. In your dashboard go to <strong>Compute (Workers)</strong> and then <strong>Workers & Pages</strong>.
      </DocsText>

      <DocsText>
        3. Click <strong>Create</strong> button, find <strong>Start from a template</strong> and pick{" "}
        <strong>LLM App</strong>.
      </DocsText>

      <DocsText>
        4. Name your worker however you want and click <strong>Deploy</strong>.
      </DocsText>

      <DocsText>
        5. <strong>Continue to the project</strong>.
      </DocsText>

      <DocsText>
        6. In <strong>Deployments</strong> tab find the edit code button, should be top right.
      </DocsText>

      <DocsText>7. Paste the code below in the editor.</DocsText>

      <DocsText>
        7.1. Optional, before you deploy you can change the model used to whichever you want, full list{" "}
        <DocsLink href="https://developers.cloudflare.com/workers-ai/models/" label="here" />. You can change this later
        whenever you want by editing worker code and redeploying.
      </DocsText>

      <DocsText>
        8. Click <strong>Deploy</strong> go back to the dashboard.
      </DocsText>

      <DocsText>
        9. In the <strong>Settings</strong> tab under <strong>Domains & Routes</strong> copy the active worker domain (
        should be smth like <strong>name.email.workers.dev</strong> ) and paste in under{" "}
        <Text component="span" c="blue.4">
          <RemixLink to="/settings?tab=instances">/settings</RemixLink>
        </Text>{" "}
        into AI Worker.
      </DocsText>

      <DocsText>
        10. That's it, you can now play around with different models and redeploy any change to the worker that you want
        as long as it stays a GET request with ?prompt search param.
      </DocsText>

      <DocsSubtitle>AI Worker Code</DocsSubtitle>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_WORKER} language="javascript" />
      </Paper>
    </Container>
  );
};

export default DocsSelfHostAiWorker;
