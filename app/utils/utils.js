function isObject(obj) {
  var type = typeof obj;

  return type === 'function' || type === 'object' && !!obj;
}

function leadingProperty(obj) {
  return Object.keys(obj)[0];
}

function callBackName(string) {
  return `on${string.capitalize()}`;
}

export default {
  isObject: isObject,
  leadingProperty: leadingProperty,
  callBackName: callBackName
};
