import type { Config } from "tailwindcss";

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// Define the plugin function type
type PluginFunction = {
  addBase: (base: {
    [key: string]: { [key: string]: string };
  }) => void;
  theme: (path: string) => { [key: string]: string };
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({
  addBase,
  theme,
}: PluginFunction) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [
      `--${key}`,
      val,
    ])
  );

  addBase({
    ":root": newVars,
  });
}

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      colors: {
        background: "#081425", // Midnight Blue
        "background-light": "#0a1931", // Deep Navy
        "background-glow": "#102347", // Soft Blue Glow

        text: "#ffffff", // White
        "text-primary": "#ffd700", // Gold
        "text-secondary": "#00ffff", // Neon Cyan
        "text-accent": "#ff007f", // Hot Pink
        "text-subtle": "#b0c4de", // Light Steel Blue

        card: "#0f1b3d", // Dark Sapphire
        "card-highlight": "#122a52", // Deep Blue Glow
        "card-neon": "#154273", // Bright Blue Accent

        button: "#ff007f", // Hot Pink
        "button-hover": "#ff4da6", // Light Pink Glow
        "button-secondary": "#00ffff", // Neon Cyan
        "button-secondaryHover": "#00d9e3", // Bright Aqua
        "button-special": "#ffd700", // Gold

        "border-primary": "#ffd700", // Gold
        "border-secondary": "#00ffff", // Electric Cyan

        "gradient-start": "#ff007f", // Neon Pink
        "gradient-middle": "#ffd700", // Gold
        "gradient-end": "#00ffff", // Electric Cyan
        "gradient-deep": "#0a1931", // Dark Navy
        "gradient-intense": "#154273", // Bright Blue
      },
      backgroundImage: {
        gradient:
          "linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))",
      },
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;

export default config;
