import Ember from 'ember';
import createAction from '../utils/create-action';
import createStore from '../utils/create-store';
import _ from "../utils/utils";

export default Ember.Object.extend({
  createAction: createAction,
  createStore: createStore,

  createActions: function(definitions) {
    let actions = {};

    for(let k of definitions) {
      if(_.isObject(k)) {
        let key = Object.keys(k)[0],
            val = k[key];

        actions[key] = createAction(val);
      }
      else {
        actions[k] = createAction();
      }
    }

    return actions;
  }
});
