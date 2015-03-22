import Ember from 'ember';
import _ from "../utils/utils";

export default Ember.Mixin.create({
  /**
   * Sets up a subscription to the given listenable for the context object
   *
   * @param {Action|Store} listenable An Action or Store that should be
   *  listened to.
   * @param {Function|String} callback The callback to register as event handler
   * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
   */
  listenTo: function(listenable, callback) {
    let unsubscribe,
        subscriptions = this.subscriptions || [],
        unsubscriber,
        subscriptionObject;

    unsubscribe = listenable.listen(this[callback] || callback, this);

    unsubscriber = function () {
      var index = subscriptions.indexOf(subscriptionObject);

      Ember.assert('Tried to remove listen already gone from subscriptions list.', index !== -1);
      subscriptions.splice(index, 1);

      unsubscribe();
    };

    subscriptionObject = {
      stop: unsubscribe,
      listenable: listenable
    };

    subscriptions.push(subscriptionObject);

    return subscriptionObject;
  },

  /**
   * A convenience method that listens to all listenables in the given object.
   *
   * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
   */
  listenToMany: function(listenables) {
    for(let action of listenables) {
      let key, callBackName, localName;

      if(_.isObject(action)) {
        key = _.leadingProperty(action);
      }
      else {
        key = action;
      }

      callBackName = _.callBackName(key);

      localName = this[callBackName] ? callBackName : this[key] ? key : undefined;

      if(localName) {
        this.listenTo(action, localName);
      }
    }
  }
});
