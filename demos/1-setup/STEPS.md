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
    "noImplicitAny": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "jsx": "react",
    "jsxFactory": "tsx",
    "target": "es5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "include": [
    "./app/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

1.  Let's build our app by running the TypeScript compiler and enabling the `watch` flag


```
npx tsc -w
```

1.  Let's update `main.ts` in the `app` directory


```ts
import Map from "esri/Map";
import MapView from "esri/views/MapView";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-116.538433, 33.824775],
  zoom: 15
});
```

You've now built your first TypeScript application! 🎉
