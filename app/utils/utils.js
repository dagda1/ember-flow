function isObject(obj) {
  var type = typeof obj;

  return type === 'function' || type === 'object' && !!obj;
}

function callBackName(string) {
  return `on${string.capitalize()}`;
}

export default {
  isObject: isObject,
  callBackName: callBackName
};
