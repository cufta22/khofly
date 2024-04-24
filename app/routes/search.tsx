import ErrorPage from "@module/Error";
import PageSearch from "@module/Search";
import { useRouteError } from "@remix-run/react";

// Vercel: Render with edge for faster load times, broken :(
// export const config = { runtime: "edge" };

const Search = () => {
  return <PageSearch />;
};

// Search error
export function ErrorBoundary() {
  const error: any = useRouteError();

  return (
    <ErrorPage
      code={error?.status || 500}
      title="You have found a secret place"
      message={error?.data || error?.message || "Unknown Error"}
      stack={error?.stack}
    />
  );
}

export default Search;
