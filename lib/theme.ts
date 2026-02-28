export type ThemeKey = "light" | "dark";

export interface Theme {
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textSoft: string;
  muted: string;
  accent: string;
  accentSoft: string;
  green: string;
  greenSoft: string;
  yellow: string;
  yellowSoft: string;
  red: string;
  redSoft: string;
  lavender: string;
  lavenderSoft: string;
  peach: string;
  peachSoft: string;
  shadow: string;
  sidebar: string;
}

export const THEMES: Record<ThemeKey, Theme> = {
  light: {
    bg: "#faf8f5",
    bgAlt: "#f3efe8",
    surface: "#ffffff",
    surfaceHover: "#fdf9f6",
    border: "#ede8e0",
    text: "#2d2520",
    textSoft: "#4a3f38",
    muted: "#9c8f86",
    accent: "#e07b5a",
    accentSoft: "#fceee8",
    green: "#5aab8a",
    greenSoft: "#e8f5ef",
    yellow: "#d4943a",
    yellowSoft: "#fef3e2",
    red: "#d45a6a",
    redSoft: "#fde8ec",
    lavender: "#8b7ec8",
    lavenderSoft: "#eeecf8",
    peach: "#e0956a",
    peachSoft: "#fdf0e8",
    shadow: "rgba(180,140,110,0.12)",
    sidebar: "#ffffff",
  },

  dark: {
    bg: "#1e1a16",
    bgAlt: "#252018",
    surface: "#2c2720",
    surfaceHover: "#332d25",
    border: "#3d3530",
    text: "#f5f0ea",
    textSoft: "#d4c8be",
    muted: "#8a7a6e",
    accent: "#f0926e",
    accentSoft: "#3d2820",
    green: "#72c4a2",
    greenSoft: "#1a2f26",
    yellow: "#e8b06a",
    yellowSoft: "#2d2010",
    red: "#e87890",
    redSoft: "#2d1820",
    lavender: "#a898e0",
    lavenderSoft: "#201e30",
    peach: "#f0a882",
    peachSoft: "#2d2018",
    shadow: "rgba(0,0,0,0.25)",
    sidebar: "#252018",
  },
};