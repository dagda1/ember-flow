import Ember from 'ember';
import PublisherMethodsMixin from '../mixins/publisher-methods';
import ListenerMethodsMixin from '../mixins/listener-methods';

export default function createStore(definition) {
  definition = definition || {};

  let store = Ember.Object.createWithMixins(PublisherMethodsMixin, ListenerMethodsMixin, {
    setup: Ember.on('init', function(){
      this.subscriptions = [];
      // if(this.listenables) {
      // this.listenToMany
    })
  }, definition);

  return store;
}
