import { EffectValueType } from "./interfaces";

export function getEffectValueTypes(effectId: string): EffectValueType[] {
  switch (effectId) {
    case "bloom":
      return [
        {
          id: "strength",
          min: 0,
          max: 100,
          unit: "%"
        },
        {
          id: "radius",
          min: 0,
          max: 100,
          unit: "px"
        },
        {
          id: "threshold",
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "blur":
      return [
        {
          min: 0,
          max: 100,
          unit: "px"
        }
      ];
    case "brightness":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "contrast":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "drop-shadow":
      return [
        {
          id: "offsetX",
          min: 0,
          max: 100,
          unit: "px"
        },
        {
          id: "offsetY",
          min: 0,
          max: 100,
          unit: "px"
        },
        {
          id: "blurRadius",
          min: 0,
          max: 100,
          unit: "px"
        }
      ];
    case "grayscale":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "hue-rotate":
      return [
        {
          min: 0,
          max: 100,
          unit: "deg"
        }
      ];
    case "invert":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "opacity":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "saturate":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    case "sepia":
      return [
        {
          min: 0,
          max: 100,
          unit: "%"
        }
      ];
    default:
      return null;
  }
}
