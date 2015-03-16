import Ember from 'ember';
import PublisherMethodsMixin from '../mixins/publisher-methods';
import _ from './utils';

let __slice = Array.prototype.slice;

export default function createAction(definition) {
  definition = definition || {};

  if(!_.isObject(definition)) {
    definition = {actionName: definition};
  }

  let context = Ember.Object.createWithMixins(PublisherMethodsMixin, {
    eventLabel: "action",
    _isAction: true
  }, definition);

  let functor = function() {
    let args = __slice.call(arguments);

    args.unshift(functor.eventLabel);

    Ember.run.next(() =>
                   functor.trigger.apply(functor, args));
  };

  $.extend(functor, context);

  return functor;
}
