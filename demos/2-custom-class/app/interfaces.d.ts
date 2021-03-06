import Collection from "esri/core/Collection";
import Layer from "esri/layers/Layer";
import LayerEffect from "./LayerEffect";

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

export type LayerEffectCollection = Collection<LayerEffect>;

export interface LayerEffectProperties {
  id: LayerEffectID;
  values: number[];
  enabled?: boolean;
}

export interface EffectLayer extends Layer {
  effect: any;
}

export interface LayerFXProperties {
  layer: EffectLayer;
}
