import { useInstanceStore } from "@store/instance";
import {
  getDefaultApi,
  getDefaultSearXNG,
  getDefaultWorker,
  getDefaultPv,
} from "@store/instance/utils";
import { useEffect } from "react";

// Initialize instance domains
const useInstanceInit = () => {
  const hydrated = useInstanceStore((state) => state.hydrated);

  const nominatimDomain = useInstanceStore((state) => state.nominatimDomain);
  const setNominatimDomain = useInstanceStore((state) => state.setNominatimDomain);

  const searXNGDomain = useInstanceStore((state) => state.searXNGDomain);
  const setSearXNGDomain = useInstanceStore((state) => state.setSearXNGDomain);

  const apiDomain = useInstanceStore((state) => state.apiDomain);
  const setApiDomain = useInstanceStore((state) => state.setApiDomain);

  const workerDomain = useInstanceStore((state) => state.workerDomain);
  const setWorkerDomain = useInstanceStore((state) => state.setWorkerDomain);

  const pvDomain = useInstanceStore((state) => state.pvDomain);
  const setPvDomain = useInstanceStore((state) => state.setPvDomain);

  useEffect(() => {
    if (!hydrated) return;

    // Set instance URL initially
    if (!nominatimDomain) setNominatimDomain(process.env.NOMINATIM_URL || "");
    if (!searXNGDomain) setSearXNGDomain(getDefaultSearXNG());
    if (!apiDomain) setApiDomain(getDefaultApi());
    if (!workerDomain) setWorkerDomain(getDefaultWorker());
    if (!pvDomain) setPvDomain(getDefaultPv());
  }, [hydrated]);
};

export default useInstanceInit;
