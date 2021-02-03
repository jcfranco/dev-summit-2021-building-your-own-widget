import WidgetProperties = __esri.WidgetProperties;

import Collection = require("esri/core/Collection");
import Layer = require("esri/layers/Layer");
import LayerEffect = require("./LayerEffect");

export type LayerFXState = "ready" | "loading" | "disabled";

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

export interface EffectValueType {
  id?: string;
  max: number;
  min: number;
  unit: "%" | "deg" | "px";
}

export interface EffectLayer extends Layer {
  effect: any;
}

export interface LayerEffectProperties {
  id: LayerEffectID;
  name: string;
  values: number[];
  enabled?: boolean;
}

export type LayerEffectCollection = Collection<LayerEffect>;

interface LayerFXProperties {
  layer: EffectLayer;
}

export interface LayerFXWidgetProperties extends WidgetProperties, LayerFXProperties {}
