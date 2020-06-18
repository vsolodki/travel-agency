export default {
  createSuccessHeader: {
    cs: "Účastník byl vytvořen",
    en: "Participant was created"
  },

  createFailHeader: {
    cs: "Destinaci se nepodařilo vytvořit",
    en: "Failed to create participant"
  },

  updateSuccessHeader: {
    cs: "Účastník byl upraven",
    en: "Participant was updated"
  },

  updateFailHeader: {
    cs: "Destinaci se nepodařilo upravit",
    en: "Failed to update participant"
  },

  deleteSuccessHeader: {
    cs: "Účastník byl odstraněn",
    en: "Participant was deleted"
  },

  deleteFailHeader: {
    cs: "Destinaci se nepodařilo odstranit",
    en: "Failed to delete participant"
  },

  rightsError: {
    cs: "K provedení akce nemáte dostatečná práva.",
    en: "You do not have sufficient rights for this action."
  },

  participantInUseError: {
    cs:
      'Účastník má organizované zájezdy. Aby byl účastník smazán, musíte v dialogu smazání zaškrtnout volbu "Smazat účastníka i pokud účastní zájezdu?"',
    en:
      'Participant has trips. To delete this participant you have to check "Delete participant assigned to trips?" in the confirm dialog.'
  },
  participantNameNotUnique: {
    cs: "Název účastníka musí být unikátní.",
    en: "Participant name must be unique."
  },

  unexpectedServerError: {
    cs: "Na serveru došlo k neočekávané chybě.",
    en: "Unexpected error occured"
  }
};
