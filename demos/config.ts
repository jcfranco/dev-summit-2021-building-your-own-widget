import config = require("esri/config");
import IdentityManager = require("esri/identity/IdentityManager");
import OAuthInfo = require("esri/identity/OAuthInfo");

const placeholderAppId = "<your-app-id>";

const configData = {
  appId: "Iilm8LMdKtqTRXOC",
  portalUrl: "https://devtesting.mapsdevext.arcgis.com/"
};

const demoing = configData.appId !== placeholderAppId;

if (demoing) {
  config.portalUrl = configData.portalUrl;

  IdentityManager.registerOAuthInfos([
    new OAuthInfo({
      appId: configData.appId,
      portalUrl: configData.portalUrl
    })
  ]);
}
