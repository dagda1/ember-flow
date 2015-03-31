import Ember from 'ember';

function isObject(obj) {
  var type = typeof obj;

  return type === 'function' || type === 'object' && !!obj;
}

function callBackName(string) {
  return `on${Ember.String.capitalize(string)}`;
}

export default {
  isObject: isObject,
  callBackName: callBackName
};
