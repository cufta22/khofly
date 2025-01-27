import { DotNestedKeys, ITranslations } from "@ts/global.types";

import { useClientServerState } from "@store/client-server";

const getValueByString = (
  obj: ITranslations,
  keyString: DotNestedKeys<ITranslations>
): string => {
  const keys = keyString.split(".") as any[];

  let loopObj = obj;
  let result;

  for (const key of keys) {
    // @ts-ignore
    if (keys.indexOf(key) === keys.length - 1) result = loopObj[key];
    // @ts-ignore
    loopObj = loopObj[key];
  }

  return result;
};

export const useTranslate = () => {
  const { content } = useClientServerState();

  const t = (keysString: DotNestedKeys<ITranslations>, ...args: string[]) => {
    if (!content) return "<-- untranslated -->";

    const label = getValueByString(content, keysString);

    if (args.length) {
      const formattedContent = label?.replace(/{(\d+)}/g, (match) => {
        return args[parseInt(match.substring(1, 2))];
      });

      return formattedContent || "<-- untranslated -->";
    }

    return label || "<-- untranslated -->";
  };

  return t;
};
