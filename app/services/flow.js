import Ember from 'ember';
import createAction from '../utils/create-action';
import createStore from '../utils/create-store';

export default Ember.Object.extend({
  createAction: createAction,
  createStore: createStore
});
