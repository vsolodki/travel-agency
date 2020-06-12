import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "Trips.",
  CSS: Config.CSS + "trips-"
};
