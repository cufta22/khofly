import { randomUUIDv7 } from "bun";
import { kv_Actions } from "../kv";

export const createInitialKVPair = (targetUrl: string): string => {
  const existingKV = kv_Actions.get({ by: "value", val: targetUrl });

  if (!existingKV) {
    const newKey = randomUUIDv7();

    try {
      kv_Actions.set({ key: newKey, value: targetUrl });

      return newKey;
    } catch (error) {
      console.log("Error creating initial KV pair");
    }
  } else {
    return existingKV.key;
  }

  return "";
};
