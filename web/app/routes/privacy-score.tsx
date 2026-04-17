import PagePrivacyScore from 'src/modules/PrivacyScore';
import { PRIVACY_SCORE_META_FUNCTION } from 'app/meta/privacy-score';

// Meta tags
export const meta = PRIVACY_SCORE_META_FUNCTION;

const PrivacyScore = () => {
  return <PagePrivacyScore />;
};

export default PrivacyScore;
