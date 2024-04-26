import ErrorPage from "@module/Error";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [{ title: "Page not found" }];
};

const NotFound = () => {
  return (
    <ErrorPage
      code={404}
      title="You have found a secret place"
      message="Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
    />
  );
};

export default NotFound;
