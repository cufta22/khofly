import contentJson from "public/locales/en.json";

export type ITranslations = typeof contentJson;

export interface IFC {
  children?: React.ReactNode;
}

export type ILanguage = "en" | "de";

export type IAppTheme =
  | "Mantine-Old"
  | "Mantine-New"
  | "Catppuccin"
  | "Rose-Pine"
  | "Custom"
  | "Nord"
  | "Tokyo-Night";

export interface RootLoaderData {
  language: ILanguage;
  theme: IAppTheme;
  content: ITranslations;

  env: {
    NODE_ENV: string;
    HOST: string;
    SEARXNG_URL_EU1: string;
    SEARXNG_URL_US1: string;
    API_URL_EU1: string;
    API_URL_US1: string;
    NOMINATIM_URL: string;
    WORKER_URL: string;
    IS_SELF_HOST: string;
    APP_NAME: string;
    SEARXNG_URL_SELF_HOST: string;
    API_URL_SELF_HOST: string;
  };

  // Platform variables
  nodeVersion: string | undefined;
  // Vercel stuff
  vercelRegion: string | undefined;
  // Fly.io stuff
  flyAppName: string | undefined;
  flyRegion: string | undefined;
  flyMachineId: string | undefined;
  // Cloudflare stuff
}

// For translations

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
