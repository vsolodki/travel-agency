import Lsi from "../config/lsi.js";

export default {
  list: {
    cs: "Seznam zájezdů",
    en: "List of trips"
  },
  create: {
    cs: "Vytvořit zájezd",
    en: "Create trip"
  },
  createHeader: {
    cs: "Vytvořit zájezd",
    en: "Create trip"
  },
  updateHeader: {
    cs: "Upravit zájezd",
    en: "Update trip"
  },
  deleteHeader: {
    cs: "Smazat zajezd",
    en: "Delete trip"
  },

  deleteConfirm: {
    cs: 'Tato akce je nevratná. Opravdu chcete smazat zajezd s názvem "%s"?',
    en: 'This action is permanent. Are you sure you want to delete trip "%s"?'
  },
  ...Lsi.buttons,

  filterByParticipant: {
    cs: "Účástník",
    en: "Participant"
  },
  filterByLocation: {
    cs: "Destinace",
    en: "Location"
  },

  filterByImage: {
    cs: "Obrázku",
    en: "Image"
  },

  filterByUser: {
    cs: "Uživatele",
    en: "User"
  },

  filterByVisibility: {
    cs: "Publikace",
    en: "Published"
  }
};
