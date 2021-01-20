import Widget = require("esri/widgets/Widget");
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import { ItemScoreProperties } from "./interfaces";
import { CSS, i18n } from "./resources";

@subclass("esri.demo.LayerFX")
class LayerFX extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props: ItemScoreProperties) {
    super();
  }

  postInitialize(): void {
    //this.own();
  }

  destroy(): void {}

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @property()
  @renderable()
  private _thumbnailBlobUrl: string;

  @property()
  @renderable()
  private _activeSave: Promise<void>;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //<editor-fold desc="...properties">
  //----------------------------------
  //  itemId
  //----------------------------------

  //@aliasOf("viewModel.itemId")
  //itemId: ItemScoreViewModel["itemId"];

  //----------------------------------
  //  portal
  //----------------------------------

  //@aliasOf("viewModel.portal")
  //portal: ItemScoreViewModel["portal"];

  //----------------------------------
  //  viewModel
  //----------------------------------

  @property()
  @renderable([
    "viewModel.description",
    "viewModel.score",
    "viewModel.state",
    "viewModel.suggestions",
    "viewModel.summary",
    "viewModel.tags",
    "viewModel.termsOfUse",
    "viewModel.title"
  ])
  viewModel: any = null;
  //</editor-fold>

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  render() {
    return <div>test</div>;
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}

export = LayerFX;
