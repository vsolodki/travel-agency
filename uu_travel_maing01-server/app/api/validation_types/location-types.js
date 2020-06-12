/* eslint-disable */
const locationCreateDtoInType = shape({
  name: uu5String(255),
  country: uu5String(255),
  city: uu5String(255),
  icon: string(40),
});

const locationGetDtoInType = shape({
  id: id().isRequired("name"),
  name: uu5String(255).isRequired("id")
});

const locationUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  country: uu5String(255),
  city: uu5String(255),
  icon: string(40),
});

const locationDeleteDtoInType = shape({
  id: id().isRequired(),
  forceDelete: boolean()
});

const locationListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});
