import contentJson from "public/locales/en.json";

export type ITranslations = typeof contentJson;

export interface IFC {
  children?: React.ReactNode;
}

export type ILanguage = "en" | "de";

export type IAppTheme =
  | "Mantine-Old"
  | "Mantine-New"
  | "Catppuccin-Mocha"
  | "Rose-Pine"
  | "Custom"
  | "Nord"
  | "Tokyo-Night";

export interface RootLoaderData {
  language: ILanguage;
  theme: IAppTheme;

  // Platform variables
  nodeVersion: string | undefined;
  // Vercel stuff
  vercelRegion: string | undefined;
  // Fly.io stuff
  flyAppName: string | undefined;
  flyRegion: string | undefined;
  flyMachineId: string | undefined;
}

// For translations

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
