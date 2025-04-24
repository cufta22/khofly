// Security headers to check and their weights in scoring
const securityHeaders = {
  "strict-transport-security": { weight: 1.5 },
  "content-security-policy": { weight: 2 },
  "x-content-type-options": { weight: 1 },
  "x-frame-options": { weight: 1 },
  "x-xss-protection": { weight: 0.5 },
  "referrer-policy": { weight: 1 },
  "permissions-policy": { weight: 1 },
  "cross-origin-embedder-policy": { weight: 0.5 },
  "cross-origin-opener-policy": { weight: 0.5 },
  "cross-origin-resource-policy": { weight: 0.5 },
  "cache-control": { weight: 0.5 },
};

export const checkSecurityHeaders = (headers: Headers) => {
  let score = 0;

  for (const [headerName, headerInfo] of Object.entries(securityHeaders)) {
    // Case-insensitive header lookup by converting all header names to lowercase
    const headerKey = Object.keys(headers).find(
      (key) => key.toLowerCase() === headerName.toLowerCase()
    );
    const headerValue = headerKey ? headers.get(headerKey) : null;

    if (headerValue) {
      score = score + headerInfo.weight;
    }
  }

  return score === 10
    ? "A+"
    : score >= 9
    ? "A"
    : score >= 8.5
    ? "A-"
    : score >= 8
    ? "B+"
    : score >= 7
    ? "B"
    : score >= 6.5
    ? "B-"
    : score >= 6
    ? "C+"
    : score >= 5
    ? "C"
    : score >= 4.5
    ? "C-"
    : score >= 4
    ? "D+"
    : score >= 3
    ? "D"
    : score >= 2.5
    ? "D-"
    : "F";
};
