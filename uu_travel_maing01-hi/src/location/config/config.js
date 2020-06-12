import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "Location.",
  CSS: Config.CSS + "location-"
};
