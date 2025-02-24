import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ context }: LoaderFunctionArgs) => {
  // handle "GET" request
  // set up our text content that will be returned in the response
  const siteUrl = process.env.HOST;
  const siteName = process.env.APP_NAME;

  const openSearchText = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
    <ShortName>${siteName}</ShortName>
    <Description>${siteName} search</Description>
    <Url type="text/html" method="get" template="${siteUrl}/search?q={searchTerms}"/>
    <InputEncoding>UTF-8</InputEncoding>
    <Image height="32" width="32" type="image/x-icon">${siteUrl}/favicon.ico</Image>
    <moz:SearchForm>${siteUrl}/search</moz:SearchForm>
</OpenSearchDescription>  
  `;

  // return the text content, a status 200 success response, and set the content type to application/xml
  return new Response(openSearchText, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
