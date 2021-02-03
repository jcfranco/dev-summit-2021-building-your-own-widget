# TypeScript + JS API Setup

1.  Go to the project directory

```
cd <project-directory>
```

1.  Initialize project with defaults (for demo purposes)

```
npm init --yes
```

1.  Install dependencies and JS API typings

```
npm install --save-dev typescript @types/arcgis-js-api
```

1.  Initialize TypeScript for the current project

```
npx tsc --init
```

1.  The previous step creates a config file (`tsconfig.json`) for the TypeScript compiler with defaults and lists all possible options. For our demo, well copy over base configuration options from the [ArcGIS JS API TypeScript setup guide page](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html#compile-typescript)

```json
{
  "compilerOptions": {
    "module": "amd",
    "lib": ["ES2019", "DOM"],
    "noImplicitAny": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "jsx": "react",
    "jsxFactory": "tsx",
    "target": "es5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true,
    "importHelpers": true,
    "moduleResolution": "node",
    "noEmitHelpers": true
  },
  "include": ["./demos", "typings"],
  "exclude": ["node_modules", "**/*-final.tsx", "**/*-final.ts"]
}
```

1.  Let's build our app by running the TypeScript compiler and enabling the `watch` flag

```
npx tsc -w
```

1.  Let's update `main.ts` in the `app` directory

```ts
import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";

const map = new EsriMap({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12
});
```

You've now built your first TypeScript application! 🎉
