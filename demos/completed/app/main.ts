import "demos/config";
import ItemScore = require("./ItemScore");

//----------------
//  widget setup
//----------------

const itemScore = new ItemScore({ itemId: "", container: "widgetDiv" });

// add to window for demo
(window as any).itemScore = itemScore;

