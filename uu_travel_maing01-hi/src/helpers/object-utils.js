// filter out object values only for selected keys
function whitelistedKeys(object, ...keys) {
  let result = {};
  keys.forEach(key => {
    if (object.hasOwnProperty(key)) {
      result[key] = object[key];
    }
  });
  return result;
}


function dig(object, ...keys) {
  let pointer = object;
  for (let key of keys) {
    if (!pointer[key]) {
      return null;
    }
    pointer = pointer[key];
  }
  return pointer;
}

export { whitelistedKeys, dig };
export default { whitelistedKeys };
