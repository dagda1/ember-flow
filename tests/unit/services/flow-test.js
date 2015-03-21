import {
  moduleFor,
  test,
} from 'ember-qunit';
import Ember from 'ember';
import QUnit from 'qunit';

moduleFor('service:flow', {
});

test('an action can be called synchronously', function(assert) {
  let service = this.subject(),
      syncCalled = false,
      syncAction = service.createAction({sync: true}),
      store = service.createStore({
        sync: function() {
          syncCalled = true;
        }
      });

  store.listenTo(syncAction, "sync");

  syncAction();

  assert.ok(syncAction._isAction, "is an action");
  assert.ok($.isFunction(syncAction, "action is a function"));
  assert.ok(syncCalled, "The action was called");
});

test('an action can be called asynchronously', function(assert) {
  let service = this.subject(),
      asyncCalled = false,
      asyncAction = service.createAction(),
      store = service.createStore({
        async: function() {
          asyncCalled = true;
        }
      });

  store.listenTo(asyncAction, "async");

  QUnit.stop();

  asyncAction();

  Ember.run.next(() => {
    QUnit.start();
    assert.ok(asyncAction._isAction, "is an action");
    assert.ok($.isFunction(asyncAction, "action is a function"));
    assert.ok(asyncCalled, "The action was called");
  });
});

test('multiple actions can be created', function(assert) {
  let service = this.subject(),
      actionNames = ["foo", "bar"],
      actions = service.createActions(actionNames);

  let assertAction = (actionName) => {
    let action = actions[actionName];

    assert.ok(actions.hasOwnProperty(actionName), "actions has property");
    assert.ok($.isFunction(action), "action is callable");
    assert.ok(action._isAction, actionName, "action is action");
  };

  actionNames.forEach( (actionName) => assertAction(actionName));
});

test('multiple actions can be called', function(assert) {
  let service = this.subject(),
      actions = service.createActions(["foo", "bar"]),
      fooCalled = false,
      barCalled = false,
      store = service.createStore({
        foo: function() {
          fooCalled = true;
        },
        bar: function() {
          barCalled = true;
        }
      });

  store.listenTo(actions.foo, "foo");
  store.listenTo(actions.bar, "bar");

  QUnit.stop();

  actions.foo();
  actions.bar();

  Ember.run.next(() => {
    QUnit.start();
    assert.ok(fooCalled, "action foo called.");
    assert.ok(barCalled, "action bar called");
  });
});

test('multiple synchrnous actions can be called', function(assert) {
  let service = this.subject(),
      actions = service.createActions([
        {foo: {sync: true}},
        {bar: {sync: true}}
      ]),
      fooCalled = false,
      barCalled = false,
      store = service.createStore({
        foo: function() {
          fooCalled = true;
        },
        bar: function() {
          barCalled = true;
        }
      });


  store.listenTo(actions.foo, "foo");
  store.listenTo(actions.bar, "bar");

  actions.foo();
  actions.bar();

  assert.ok(fooCalled, "action foo called.");
  assert.ok(barCalled, "action bar called");
});
