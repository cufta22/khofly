import { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useLocation, useSearchParams } from "react-router";

const NProgress = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    nprogress.complete();
  }, [pathname, searchParams]);

  return <NavigationProgress />;
};

export default NProgress;
