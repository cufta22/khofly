import PagePrivacyScore from '@module/PrivacyScore/';
import { PRIVACY_SCORE_META_FUNCTION } from '../meta/privacy-score';

// Meta tags
export const meta = PRIVACY_SCORE_META_FUNCTION;

const PrivacyScore = () => {
  return <PagePrivacyScore />;
};

export default PrivacyScore;
