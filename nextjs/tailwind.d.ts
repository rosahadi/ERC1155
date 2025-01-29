/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "tailwindcss/lib/util/flattenColorPalette" {
  function flattenColorPalette(colors: any): {
    [key: string]: string;
  };
  export default flattenColorPalette;
}
