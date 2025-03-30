import { Blockquote, Code, Paper } from "@mantine/core";
import DocsCodeHighlight from "../../common/DocsCodeHighlight/DocsCodeHighlight";
import DocsSubtitle from "../../common/DocsSubtitle";
import DocsLink from "../../common/DocsLink";

import DocsText from "../../common/DocsText";
import { usePrimaryColor } from "@hooks/use-primary-color";

const CODE_WORKER = `
const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS', 
  'Access-Control-Allow-Origin': 'https://khofly.com', // Replace if you need with appropriate domain 
};

const GENIUS_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Cache-Control": "max-age=0",
  TE: "Trailers",
};

export default {
  async fetch(request, env) {
    const { method } = request;

    const url = new URL(request.url); // Get the URL of the request
    const songUrl = url.searchParams.get('songUrl'); // Retrieve the 'songUrl' query parameter

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

    if (!songUrl) return new Response('songUrl is missing', { status: 400 });

    try {
      // Try to get the genius lyrics page
      const songRes = await fetch(songUrl, {
        headers: GENIUS_HEADERS,
      });

      const songHtml = await songRes.text();

      return Response.json({ songHtml }, {
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

const SectionLyricsWorker = () => {
  const linkTextColor = usePrimaryColor(4);

  return (
    <>
      <Blockquote color="yellow" mt="xl" radius="sm">
        This applies only if you want to self-host Khofly API.
      </Blockquote>

      <DocsText>
        1. Go to <DocsLink href="cloudflare.com" label="cloudflare.com" /> and log in.
      </DocsText>

      <DocsText>
        2. In your dashboard go to <strong>Workers & Pages</strong> and then{" "}
        <strong>Workers & Pages</strong>.
      </DocsText>

      <DocsText>
        3. Click <strong>Create</strong> button, find <strong>Start from a template</strong> and
        click on <strong>Hello World</strong> button.
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
        paste it APIs <Code>.env.local</Code> under <Code>LYRICS_WORKER_URL</Code>
      </DocsText>

      <DocsSubtitle>Lyrics Worker Code</DocsSubtitle>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <DocsCodeHighlight code={CODE_WORKER} language="javascript" />
      </Paper>
    </>
  );
};

export default SectionLyricsWorker;
