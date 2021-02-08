import WidgetProperties = __esri.WidgetProperties;

import Collection from "esri/core/Collection";
import Layer from "esri/layers/Layer";
import LayerEffect from "./LayerEffect";

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
  values: number[];
  enabled?: boolean;
}

export type LayerEffectCollection = Collection<LayerEffect>;

export interface LayerFXProperties {
  layer: EffectLayer;
}

export interface LayerFXWidgetProperties extends WidgetProperties, LayerFXProperties {}
