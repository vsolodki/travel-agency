/* eslint-disable */
const travelInstanceInitDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri().isRequired("uuAppProfileAuthorities"),
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000),
  logo: binary()
});

const travelInstancePlugInBtDtoInType = shape({
  uuBtLocationUri: uri().isRequired(),
});

const travelInstanceSetLogoDtoInType = shape({
  type: oneOf("16x9","3x2","4x3","2x3","10x1","1x10"),
  logo: binary().isRequired()
});

const travelInstanceUpdateDtoInType = shape({
  state: oneOf(["active", "underConstruction", "closed"]),
  name: uu5String(4000)
});

const travelInstanceSetIconsDtoInType = shape({
  data: binary().isRequired()
})

const getProductLogoDtoInType = shape({
  type: oneOf("16x9","3x2","4x3","2x3","10x1","1x10")
});

const travelInstanceGetUveMetaDataDtoInType = shape({
  type: string().isRequired()
});

