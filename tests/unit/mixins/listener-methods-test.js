import Ember from 'ember';
import ListenerMethodsMixin from '../../../mixins/listener-methods';
import createAction from '../../../utils/create-action';
import createStore from '../../../utils/create-store';
import { module, test } from 'qunit';

module('ListenerMethodsMixin');

test('should call listenTo for all liestneables with corresponding callbacks', function(assert) {
  var ListenerMethodsObject = Ember.Object.extend(ListenerMethodsMixin),
      listenables = {
        foo: {sync: true},
        bar: {sync: true}
      },
      subject = ListenerMethodsObject.create({
        onFoo: "onFoo",
        onBar: "bar",
        listenTo: sinon.spy()
      });

  subject.listenToMany(listenables);

  assert.equal(2, subject.listenTo.callCount, "listenTo called twice");
  assert.deepEqual([listenables.foo, "onFoo"], subject.listenTo.firstCall.args);
  assert.deepEqual([listenables.bar, "onBar"], subject.listenTo.secondCall.args);
});

var store,
    action1,
    action2,
    action3,
    fn = function(){};

module('ListenerMethodsMixin - Stop Listening');

test('calling stop on the listener should remove the listener from the list but keep the others.', function(assert) {
  store = createStore();

  action1 = createAction({sync: true});
  action3 = createAction({sync: true});

  store.listenTo(action1, fn);
  store.listenTo(createAction(), fn);
  store.listenTo(action3, fn);

  store.subscriptions[1].stop();

  assert.equal(2, store.subscriptions.length);

  assert.equal(action1, store.subscriptions[0].listenable);
  assert.equal(action3, store.subscriptions[1].listenable);
});

test('calling stopListeningTo on the store should remove the listener from the store but keep the others.', function(assert) {
  store = createStore();

  action1 = createAction({sync: true});
  action2 = createAction({sync: true});
  action3 = createAction({sync: true});

  store.listenTo(action1, fn);
  store.listenTo(action2, fn);
  store.listenTo(action3, fn);

  store.stopListeningTo(action2);

  assert.equal(2, store.subscriptions.length);

  assert.equal(action1, store.subscriptions[0].listenable);
  assert.equal(action3, store.subscriptions[1].listenable);
});

test('stopListeningToAll removes all subscriptions.', function(assert) {
  store = createStore();

  action1 = createAction({sync: true});
  action2 = createAction({sync: true});
  action3 = createAction({sync: true});

  store.listenTo(action1, fn);
  store.listenTo(action2, fn);
  store.listenTo(action3, fn);

  store.stopListeningToAll();

  assert.equal(0, store.subscriptions.length);
});
