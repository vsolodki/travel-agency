import Lsi from "../config/lsi.js";

export default {
  list: {
    cs: "Seznam účastníků",
    en: "List of participants"
  },
  create: {
    cs: "Vytvořit účastníka",
    en: "Create participant"
  },
  createHeader: {
    cs: "Vytvořit účastníka",
    en: "Create participant"
  },
  updateHeader: {
    cs: "Upravit účastníka",
    en: "Update participant"
  },
  deleteHeader: {
    cs: "Smazat účastníka",
    en: "Delete participant"
  },
  ...Lsi.buttons,
  filterByTrip: {
    cs: "Zájezd",
    en: "Trip"
  }
};
