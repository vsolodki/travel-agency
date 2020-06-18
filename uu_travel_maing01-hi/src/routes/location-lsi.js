export default {
  createSuccessHeader: {
    cs: "Destinace byla vytvořena",
    en: "Location was created"
  },

  createFailHeader: {
    cs: "Destinaci se nepodařilo vytvořit",
    en: "Failed to create location"
  },

  updateSuccessHeader: {
    cs: "Destinace byla upravena",
    en: "Location was updated"
  },

  updateFailHeader: {
    cs: "Destinaci se nepodařilo upravit",
    en: "Failed to update location"
  },

  deleteSuccessHeader: {
    cs: "Destinace byla odstraněna",
    en: "Location was deleted"
  },

  deleteFailHeader: {
    cs: "Destinaci se nepodařilo odstranit",
    en: "Failed to delete location"
  },

  rightsError: {
    cs: "K provedení akce nemáte dostatečná práva.",
    en: "You do not have sufficient rights for this action."
  },

  locationInUseError: {
    cs:
      'Destinace obsahuje zajezdy. Aby byla destinace smazána, musíte v dialogu smazání zaškrtnout volbu "Smazat destinace i pokud obsahuje zajezdy?"',
    en:
      'Location contains trips. To delete this location you have to check "Delete location assigned to trips?" in the confirm dialog.'
  },
  locationNameNotUnique: {
    cs: "Název destinace musí být unikátní.",
    en: "Location name must be unique."
  },

  unexpectedServerError: {
    cs: "Na serveru došlo k neočekávané chybě.",
    en: "Unexpected error occured"
  }
};
