export interface PrivacyScanResponse {
  score: number;
  categories: {
    trackerHygiene: {};
    consentIntegrity: {};
    technicalDefense: {};
    policyClarity: {};
  };
}
