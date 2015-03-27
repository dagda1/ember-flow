import createStore from '../../../utils/create-store';
import { module, test } from 'qunit';

module('creatingStore');

test('should listenTo all listenables with the corresponding callbacks.', function(assert) {
  var listenables = {
    foo: {sync: true, listen: sinon.spy()},
    bar: {sync: true, listen: sinon.spy()},
    missing: {sync: true, listen: sinon.spy()}
  },
  def = {
    onFoo: sinon.spy(),
    onBar: sinon.spy(),
    listenables: listenables
  },
  store = createStore(def);

  assert.deepEqual([store.onFoo, store], listenables.foo.listen.firstCall.args);
  assert.deepEqual([store.onBar, store], listenables.bar.listen.firstCall.args);

  assert.equal(0, listenables.missing.listen.callCount);
});
