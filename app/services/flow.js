import Ember from 'ember';
import createAction from '../utils/create-action';
import createStore from '../utils/create-store';
import _ from "../utils/utils";

export default Ember.Object.extend({
  createAction: createAction,
  createStore: createStore,

  createActions: function(definitions) {
    let actions = {},
        i = 0, l = definitions.length, k;

    for(; i < l; i++) {
      k = definitions[i];

      if(_.isObject(k)) {
        let key = _.leadingProperty(k),
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
