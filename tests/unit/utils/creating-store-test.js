// import createStore from '../../../utils/create-store';
// import { module, test } from 'qunit';

// module('creatingStore');

// test('should listenTo all listenables with the corresponding callbacks.', function(assert) {
//   var listenables = [
//     {foo: {listen: sinon.spy()}},
//     {bar: {listen: sinon.spy()}},
//     {missing: {listen: sinon.spy()}}
//   ],
//   def = {
//     onFoo: sinon.spy(),
//     onBar: sinon.spy()
//   },
//   store = createStore(def);

//   assert.deepEqual([store.onFoo, store], listenables[0].foo.firstCall.args);
//   assert.deepEqual([store.onBar, store], listenables[1].bar.firstCall.args);

//   assert.equal(0, listenables[2].missing.listen.callCount);
// });
