/* eslint-disable */
const tripCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  text: uu5String(4000),
  dateFrom: date(),
  dateTo: date(),
  capacity: integer(),
  participantList: array(id(), 50),
  locationList: uu5String(4000),
  image: binary()
});

const tripGetDtoInType = shape({
  id: id().isRequired()
});

const tripUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  text: uu5String(4000),
  dateFrom: date(),
  dateTo: date(),
  capacity: integer(),
  participantList: array(id(), 50),
  locationList: uu5String(4000),
  image: binary()
});

const tripUpdateVisibilityDtoInType = shape({
  id: id().isRequired(),
  visibility: boolean().isRequired()
});

const tripDeleteDtoInType = shape({
  id: id().isRequired()
});

const tripListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  participantList: array(id(), 50),
  locationList: uu5String(4000),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


