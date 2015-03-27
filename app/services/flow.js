import Ember from 'ember';
import createAction from '../utils/create-action';
import createStore from '../utils/create-store';
import _ from "../utils/utils";

export default Ember.Object.extend({
  createAction: createAction,
  createStore: createStore,

  createActions: function(definitions) {
    let actions = {};

    for (let k in definitions){
      if (definitions.hasOwnProperty(k)) {
        let val = definitions[k],
            actionName = _.isObject(val) ? k : val;

        actions[actionName] = createAction(val);
      }
    }

    return actions;
  }
});
