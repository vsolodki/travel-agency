/* eslint-disable */
const participantCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  surname: uu5String(255),
  birthDate: date(),
  citizenship: uu5String(255),
  tripList: array(id(), 50),
  icon: string(40),
});

const participantGetDtoInType = shape({
  id: id().isRequired("name"),
  name: uu5String(255).isRequired("id")
});

const participantUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  surname: uu5String(255),
  birthDate: date(),
  citizenship: uu5String(255),
  tripList: array(id(), 50),
  icon: string(40),
});

const participantDeleteDtoInType = shape({
  id: id().isRequired(),
  forceDelete: boolean()
});

const participantListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});
