import Ember from 'ember';
import ListenerMethodsMixin from '../../../mixins/listener-methods';
import { module, test } from 'qunit';

module('ListenerMethodsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ListenerMethodsObject = Ember.Object.extend(ListenerMethodsMixin);
  var subject = ListenerMethodsObject.create();
  assert.ok(subject);
});
