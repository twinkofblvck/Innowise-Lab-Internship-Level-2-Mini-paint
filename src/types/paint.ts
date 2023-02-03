export enum LayerEffects {
  default = "source-over",
  lighter = "lighter",
  multiply = "multiply",
  screen = "screen",
  overlay = "overlay",
  darken = "darken",
  lighten = "lighten",
  colorDodge = "color-dodge",
  colorBurn = "color-burn",
  hardLight = "hard-light",
  softLight = "soft-light",
  difference = "difference",
  exclusion = "exclusion",
  hue = "hue",
  saturation = "saturation",
  color = "color",
  luminosity = "luminosity",
}

export type t_LayerEffect = keyof typeof LayerEffects;
