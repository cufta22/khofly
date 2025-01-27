import { IAppTheme, IFC, ILanguage, ITranslations } from "@ts/global.types";
import { createContext, useContext, useState } from "react";

interface ClientServerState {
  content: ITranslations | null;
  language: ILanguage;
  theme: IAppTheme;
}

interface ClientServerStateFull extends ClientServerState {
  setLanguage: (next: ILanguage) => void;
  setTheme: (next: IAppTheme) => void;
}

const initialState: ClientServerStateFull = {
  content: null,
  language: "en",
  theme: "Mantine-Old",

  setLanguage: () => {},
  setTheme: () => {},
};

export const ClientServerContext = createContext<ClientServerStateFull>(initialState);

export const useClientServerState = () => useContext(ClientServerContext);

interface Props extends IFC, ClientServerState {}

const ClientServerProvider: React.FC<Props> = ({
  children,
  content,
  language,
  theme,
}) => {
  const [state, setState] = useState({ content, language, theme });

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

  return (
    <ClientServerContext.Provider
      value={{
        content: state.content,
        language: state.language,
        theme: state.theme,

        setLanguage: setLanguage,
        setTheme: setTheme,
      }}
    >
      {children}
    </ClientServerContext.Provider>
  );
};

export default ClientServerProvider;
