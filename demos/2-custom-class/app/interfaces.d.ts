import Collection = require("esri/core/Collection");
import Layer = require("esri/layers/Layer");
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
  values: number[];
  enabled?: boolean;
}

export type LayerEffectCollection = Collection<LayerEffect>;

interface LayerFXProperties {
  layer: EffectLayer;
}
