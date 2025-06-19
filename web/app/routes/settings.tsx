import PageSettings from "@module/Settings";
import PageSettingsMobile from "@module/SettingsMobile";

import { SETTINGS_META_FUNCTION } from "app/meta/settings";
import { Route } from "./+types/settings";
import { isMobileUserAgent } from "@utils/functions/isMobileUA";

// Loader
export async function loader({ request }: Route.LoaderArgs) {
  const ua = request.headers.get("user-agent");

  const isMobile = isMobileUserAgent(ua || "");

  return { isMobile };
}

// Meta tags
export const meta = SETTINGS_META_FUNCTION;

const Settings = ({ loaderData }: Route.ComponentProps) => {
  const isMobileSSR = loaderData.isMobile;

  //return <PageSettings />;
  //return <PageSettingsMobile />;
  return isMobileSSR ? <PageSettingsMobile /> : <PageSettings />;
};

export default Settings;
