import WidgetProperties = __esri.WidgetProperties;

import Collection = require("esri/core/Collection");
import LayerEffect = require("./LayerEffect");

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

export type EffectLayer = Required<{ effect: string }>;

export type LayerEffectValue = number | number[];

export interface LayerEffectProperties {
  id: LayerEffectID;
  value: LayerEffectValue;
  enabled?: boolean;
}

export type LayerEffectCollection = Collection<LayerEffect>;

interface LayerFXProperties {
  layer: EffectLayer;
}

export interface LayerFXWidgetProperties extends WidgetProperties, LayerFXProperties {}
