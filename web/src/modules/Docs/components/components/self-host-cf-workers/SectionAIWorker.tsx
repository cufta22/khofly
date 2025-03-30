import { Paper, Text } from "@mantine/core";
import DocsCodeHighlight from "../../common/DocsCodeHighlight/DocsCodeHighlight";
import DocsSubtitle from "../../common/DocsSubtitle";
import DocsLink from "../../common/DocsLink";
import RemixLink from "@components/RemixLink";
import DocsText from "../../common/DocsText";
import { usePrimaryColor } from "@hooks/use-primary-color";

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
    const model = url.searchParams.get('model'); // Retrieve the 'model' query parameter

    const source_lang = url.searchParams.get('source_lang'); // For translate
    const target_lang = url.searchParams.get('target_lang'); // For translate

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

    if (!prompt) return new Response('Prompt is missing', { status: 400 });

    try {
      // Different body for different models
      const body = model.includes("m2m100") ? {
        text: prompt,
        source_lang: source_lang,
        target_lang: target_lang
      } : {
        prompt: prompt
      };

      let response = await env.AI.run(model, body);
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

const SectionAIWorker = () => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <>
      <DocsText>
        1. Go to <DocsLink href="cloudflare.com" label="cloudflare.com" /> and log in.
      </DocsText>

      <DocsText>
        2. In your dashboard go to <strong>Workers & Pages</strong> and then{" "}
        <strong>Workers & Pages</strong>.
      </DocsText>

      <DocsText>
        3. Click <strong>Create</strong> button, find <strong>Start from a template</strong> and
        pick <strong>LLM App</strong>.
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
        8. Click <strong>Deploy</strong> go back to the dashboard.
      </DocsText>

      <DocsText>
        9. In the <strong>Settings</strong> tab under <strong>Domains & Routes</strong> copy the
        active worker domain ( should be smth like <strong>name.email.workers.dev</strong> ) and
        paste it under{" "}
        <RemixLink to="/settings?tab=instances">
          <Text component="span" c={linkTextColor}>
            /settings
          </Text>
        </RemixLink>{" "}
        into AI Worker.
      </DocsText>

      <DocsText>
        10. That's it, you can now play around with different models and redeploy any change to the
        worker that you want.
      </DocsText>

      <DocsText>
        The model can be selected in{" "}
        <RemixLink to="/settings?tab=instances">
          <Text component="span" c={linkTextColor}>
            /settings
          </Text>
        </RemixLink>{" "}
        , speed and results will depend on the size of the model, you can find the full list of
        models <DocsLink href="https://developers.cloudflare.com/workers-ai/models/" label="here" />
        .
      </DocsText>

      <DocsSubtitle>AI Worker Code</DocsSubtitle>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_WORKER} language="javascript" />
      </Paper>
    </>
  );
};

export default SectionAIWorker;
