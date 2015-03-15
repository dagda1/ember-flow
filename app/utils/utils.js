function isObject(obj) {
  var type = typeof obj;

  return type === 'function' || type === 'object' && !!obj;
}

export default {
  isObject: isObject
};
