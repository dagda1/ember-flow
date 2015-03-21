import Ember from 'ember';
import PublisherMethodsMixin from '../../../mixins/publisher-methods';
import { module, test } from 'qunit';

module('PublisherMethodsMixin');

test('triggerProimse ', function(assert) {
  var PublisherMethodsObject = Ember.Object.extend(PublisherMethodsMixin);
  var subject = PublisherMethodsObject.create();
  assert.ok(subject);
});
