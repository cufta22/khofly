import useToast from "@hooks/use-toast";
import { useClientServerState } from "@store/client-server";
import type { IAppTheme } from "@ts/global.types";
import { setCookie } from "@utils/functions/cookies";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const ALL_THEMES: Array<IAppTheme> = [
  "Catppuccin",
  "Mantine-New",
  "Mantine-Old",
  "Nord",
  "Rose-Pine",
  "Tokyo-Night",
];

// Update settings with search params
const useSettingsParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setTheme } = useClientServerState();

  const set_theme = searchParams.get("set_theme");

  const { toast } = useToast();

  // Settings: theme
  useEffect(() => {
    if (!set_theme) return;

    if (!ALL_THEMES.includes(set_theme as IAppTheme)) {
      searchParams.delete("set_theme");
      toast.show({ message: "Theme not found", color: "yellow" });
      return;
    }

    // Set theme in context
    setTheme(set_theme as IAppTheme);

    // Set theme in cookie ( for persistance )
    setCookie("khofly-app-theme", set_theme, {
      expires: 60 * 60 * 24 * 90, // ~ 90 days
      path: "/",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "khofly.com",
      secure: process.env.HOST?.includes("https"),
      sameSite: "Strict",
    });

    // Remove from URL
    navigate("/");
  }, [set_theme]);
};

export default useSettingsParams;
