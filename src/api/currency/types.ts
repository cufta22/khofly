export interface OXRResponse {
  timestamp: number;
  base: "USD";
  rates: { [key in string]: number };
}
