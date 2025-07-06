import { randomUUIDv7 } from "bun";
import { kv_Actions } from "../kv";

export const createInitialKVPair = (targetUrl: string) => {
  const existingKV = kv_Actions.get({ by: "value", val: targetUrl });

  if (!existingKV) {
    const newKey = randomUUIDv7();

    try {
      kv_Actions.set({ key: newKey, value: targetUrl });
    } catch (error) {
      console.log(error);
    }
  }
};
