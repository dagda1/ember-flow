import {
  moduleFor,
  test,
} from 'ember-qunit';
import Ember from 'ember';
import QUnit from 'qunit';

moduleFor('service:flow', {
});

test('an action should be callable', function(assert) {
  let service = this.subject(),
      fooCalled = false,
      fooAction = service.createAction('foo'),
      store = service.createStore({
        foo: function() {
          fooCalled = true;
        }
      });

  store.listenTo(fooAction, "foo");

  QUnit.stop();

  fooAction();

  Ember.run.next(() => {
    QUnit.start();
    assert.ok(fooAction._isAction, "is an action");
    assert.ok($.isFunction(fooAction, "action is a function"));
    assert.ok(fooCalled, "The action was called");
  });
});

