import type { DotNestedKeys, ITranslations } from '@ts/global.types';

import { useClientServerState } from '@store/client-server';

const getValueByString = (obj: ITranslations, keyString: DotNestedKeys<ITranslations>): string => {
  const keys = keyString.split('.') as any[];

  let loopObj = obj;
  let result;

  for (const key of keys) {
    // @ts-expect-error it just is like this
    if (keys.indexOf(key) === keys.length - 1) result = loopObj[key];
    // @ts-expect-error it just is like this
    loopObj = loopObj[key];
  }

  return result;
};

export const useTranslate = () => {
  const { content } = useClientServerState();

  const t = (keysString: DotNestedKeys<ITranslations>, ...args: string[]) => {
    if (!content) return '<-- untranslated -->';

    const label = getValueByString(content, keysString);

    if (args.length > 0) {
      const formattedContent = label?.replaceAll(/{(\d+)}/g, (match) => {
        return args[parseInt(match.slice(1, 2))];
      });

      return formattedContent || '<-- untranslated -->';
    }

    return label || '<-- untranslated -->';
  };

  return t;
};
