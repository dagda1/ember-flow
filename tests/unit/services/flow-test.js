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

