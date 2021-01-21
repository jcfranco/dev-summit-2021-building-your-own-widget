import WidgetProperties = __esri.WidgetProperties;

// scale effects
// bloom, drop-shadow

// notes:
// ordering does matter

import Layer = require("esri/layers/Layer");
import Collection = require("esri/core/Collection");

export type LayerEffectID =
  | "bloom"
  | "blur"
  | "brightness"
  | "contrast"
  | "drop-shadow"
  | "grayscale"
  | "hue-rotate"
  | "invert"
  | "opacity"
  | "saturate"
  | "sepia";

export type LayerEffectValue = number | number[];

export interface LayerEffect {
  id: LayerEffectID;
  value: LayerEffectValue;
  enabled: boolean;
}

export type LayerEffects = Collection<LayerEffect>;

export interface LayerFXProperties extends WidgetProperties {
  effects?: LayerEffects;
  layer: Layer;
}
