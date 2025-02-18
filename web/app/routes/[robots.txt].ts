import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ context }: LoaderFunctionArgs) => {
  // handle "GET" request
  // set up our text content that will be returned in the response
  const robotText = `User-agent: *

# No search result pages
Disallow: /search

Disallow: /api

User-agent: ia_archiver
Disallow: /

User-agent: Twitterbot
Disallow:

User-agent: msnbot-media
Disallow:
    
Sitemap: ${process.env.HOST}/sitemap.xml
`;

  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
