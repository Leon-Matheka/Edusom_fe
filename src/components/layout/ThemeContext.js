import { createContext, useContext } from "react";

// Dark-mode flag for dashboards that support it (currently the teacher dashboard).
export const ThemeContext = createContext({ dark: false });
export const useTheme = () => useContext(ThemeContext);
