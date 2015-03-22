import Ember from 'ember';
import ListenerMethodsMixin from '../../../mixins/listener-methods';
import { module, test } from 'qunit';

module('ListenerMethodsMixin');

test('should call listenTo for all liestneables with corresponding callbacks', function(assert) {
  var ListenerMethodsObject = Ember.Object.extend(ListenerMethodsMixin),
      listenables = [
        {foo: {sync: true}},
        {bar: {sync: true}}
      ],
      subject = ListenerMethodsObject.create({
        onFoo: "onFoo",
        onBar: "bar",
        listenTo: sinon.spy()
      });

  subject.listenToMany(listenables);

  assert.equal(2, subject.listenTo.callCount, "listenTo called twice");
  assert.deepEqual([listenables[0], "onFoo"], subject.listenTo.firstCall.args);
  assert.deepEqual([listenables[1], "onBar"], subject.listenTo.secondCall.args);
});
