import { useInstanceStore } from "@store/instance";
import { getDefaultApi, getDefaultSearXNG } from "@store/instance/utils";
import { RootLoaderData } from "@ts/global.types";
import { useEffect } from "react";

// Initialize instance domains
const useInstanceInit = (loaderData: RootLoaderData) => {
  const {
    hydrated,

    nominatimDomain,
    setNominatimDomain,

    searXNGDomain,
    setSearXNGDomain,

    apiDomain,
    setApiDomain,
  } = useInstanceStore((state) => ({
    hydrated: state.hydrated,
    nominatimDomain: state.nominatimDomain,
    setNominatimDomain: state.setNominatimDomain,
    searXNGDomain: state.searXNGDomain,
    setSearXNGDomain: state.setSearXNGDomain,
    apiDomain: state.apiDomain,
    setApiDomain: state.setApiDomain,
  }));

  useEffect(() => {
    if (!hydrated) return;

    // Set instance URL initially
    if (!nominatimDomain) setNominatimDomain(loaderData.env.NOMINATIM_URL);
    if (!searXNGDomain) setSearXNGDomain(getDefaultSearXNG(loaderData.env));
    if (!apiDomain) setApiDomain(getDefaultApi(loaderData.env));
  }, [hydrated]);
};

export default useInstanceInit;
