import PagePrivacy from "src/modules/Privacy";
import { PRIVACY_META_FUNCTION } from "app/meta/privacy";

// Meta tags
export const meta = PRIVACY_META_FUNCTION;

const Privacy = () => {
  return <PagePrivacy />;
};

export default Privacy;
