import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandKotlin,
  IconBrandPython,
  IconBrandRust,
  IconBrandSwift,
  IconBrandTypescript,
  IconMarkdown,
  type Icon,
  type IconProps,
} from "@tabler/icons-react";
import hljs from "./hljs";

export const getChatSupportedLang = (lang: string) => {
  const supportedLanguages = hljs.listLanguages();

  const foundLang = supportedLanguages.find((val) => lang.includes(val));

  return foundLang || "markdown";
};

export const getChatLangName = (
  lang: string
): {
  langIcon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>> | null;
  langName: string;
} => {
  switch (lang) {
    case "bash":
      return {
        langIcon: null,
        langName: "Bash",
      };
    case "nginx":
      return {
        langIcon: null,
        langName: "nginx",
      };
    case "yaml":
      return {
        langIcon: null,
        langName: "YAML",
      };
    case "dockerfile":
      return {
        langIcon: null,
        langName: "Dockerfile",
      };
    case "javascript":
      return {
        langIcon: IconBrandJavascript,
        langName: "JavaScript",
      };
    case "jsx":
      return {
        langIcon: IconBrandJavascript,
        langName: "JSX",
      };
    case "typescript":
      return {
        langIcon: IconBrandTypescript,
        langName: "TypeScript",
      };
    case "tsx":
      return {
        langIcon: IconBrandJavascript,
        langName: "TSX",
      };
    case "markdown":
      return {
        langIcon: IconMarkdown,
        langName: "Markdown",
      };
    case "python":
      return {
        langIcon: IconBrandPython,
        langName: "Python",
      };
    case "java":
      return {
        langIcon: null,
        langName: "Java",
      };
    case "c":
      return {
        langIcon: null,
        langName: "C",
      };
    case "cpp":
      return {
        langIcon: null,
        langName: "C++",
      };
    case "csharp":
      return {
        langIcon: null,
        langName: "C#",
      };
    case "css":
      return {
        langIcon: null,
        langName: "CSS",
      };
    case "xml":
      return {
        langIcon: null,
        langName: "XML",
      };
    case "html":
      return {
        langIcon: IconBrandHtml5,
        langName: "HTML",
      };
    case "lua":
      return {
        langIcon: null,
        langName: "Lua",
      };
    case "elixir":
      return {
        langIcon: null,
        langName: "Elixir",
      };
    case "swift":
      return {
        langIcon: IconBrandSwift,
        langName: "Swift",
      };
    case "ruby":
      return {
        langIcon: null,
        langName: "Ruby",
      };
    case "php":
      return {
        langIcon: null,
        langName: "PHP",
      };
    case "sql":
      return {
        langIcon: null,
        langName: "SQL",
      };
    case "pgsql":
      return {
        langIcon: null,
        langName: "pgSQL",
      };
    case "go":
      return {
        langIcon: null,
        langName: "Go",
      };
    case "json":
      return {
        langIcon: null,
        langName: "JSON",
      };
    case "nix":
      return {
        langIcon: null,
        langName: "Nix",
      };
    case "haskell":
      return {
        langIcon: null,
        langName: "Haskell",
      };
    case "kotlin":
      return {
        langIcon: IconBrandKotlin,
        langName: "Kotlin",
      };
    case "powershell":
      return {
        langIcon: IconBrandKotlin,
        langName: "PowerShell",
      };
    case "rust":
      return {
        langIcon: IconBrandRust,
        langName: "Rust",
      };

    default:
      return {
        langIcon: null,
        langName: lang,
      };
  }
};
