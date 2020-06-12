import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "Participant.",
  CSS: Config.CSS + "participant-"
};
