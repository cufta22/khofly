import type { MantineColor } from "@mantine/core";
import type { IAppTheme, IFC, ILanguage, ITranslations } from "@ts/global.types";
import { createContext, useContext, useState } from "react";

interface ClientServerState {
  content: ITranslations | null;
  language: ILanguage;
  theme: IAppTheme;
  primaryColor: MantineColor;
}

interface ClientServerStateFull extends ClientServerState {
  setLanguage: (next: ILanguage) => void;
  setTheme: (next: IAppTheme) => void;
  setPrimaryColor: (next: MantineColor) => void;
}

const initialState: ClientServerStateFull = {
  content: null,
  language: "en",
  theme: "Mantine-Old",
  primaryColor: "blue",

  setLanguage: () => {},
  setTheme: () => {},
  setPrimaryColor: () => {},
};

export const ClientServerContext = createContext<ClientServerStateFull>(initialState);

export const useClientServerState = () => useContext(ClientServerContext);

interface Props extends IFC, ClientServerState {}

const ClientServerProvider: React.FC<Props> = ({
  children,
  content,
  language,
  theme,
  primaryColor,
}) => {
  const [state, setState] = useState({ content, language, theme, primaryColor });

  const setLanguage = async (next: ILanguage) => {
    // Set content in context
    // Dynamically fetch content JSON
    const contentFetch = await fetch(`/locales/${next}.json`);
    const content: ITranslations = await contentFetch.json();

    setState((prev) => ({ ...prev, language: next, content }));
  };

  const setTheme = (next: IAppTheme) => {
    setState((prev) => ({ ...prev, theme: next }));
  };

  const setPrimaryColor = (next: MantineColor) => {
    setState((prev) => ({ ...prev, primaryColor: next }));
  };

  return (
    <ClientServerContext.Provider
      value={{
        content: state.content,
        language: state.language,
        theme: state.theme,
        primaryColor: state.primaryColor,

        setLanguage: setLanguage,
        setTheme: setTheme,
        setPrimaryColor: setPrimaryColor,
      }}
    >
      {children}
    </ClientServerContext.Provider>
  );
};

export default ClientServerProvider;
