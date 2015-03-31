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

    this.validateListening(listenable);

    unsubscribe = listenable.listen(this[callback] || callback, this);

    unsubscriber = function () {
      var index = subscriptions.indexOf(subscriptionObject);

      Ember.assert('Tried to remove listen already gone from subscriptions list.', index !== -1);
      subscriptions.splice(index, 1);

      unsubscribe();
    };

    subscriptionObject = {
      stop: unsubscriber,
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
    for(let key in listenables) {
      let callBackName = _.callBackName(key),
          localName = this[callBackName] ? callBackName : this[key] ? key : undefined;

      if(localName) {
        this.listenTo(listenables[key], localName);
      }
    }
  },

  /**
   * Checks if the current context can listen to the supplied listenable
   *
   * @param {Action|Store} listenable An Action or Store that should be
   *  listened to.
   * @returns {String|Undefined} An error message, or undefined if there was no problem.
  */
  validateListening: function(listenable) {
    Ember.assert("Listener is not able to listen to itself.", listenable !== this);

    Ember.assert(`${listenable} is missing a listen method.`, $.isFunction(listenable.listen));
  },
  /**
   * Stops listening to a single listenable
   *
   * (@param {Action|Store} listenable The action or store we no longer want to listen to
   * @returns {Boolean} True if a subscription was found and removed, otherwise false.
   */
  stopListeningTo: function(listenable) {
    let subscription, subscriptions = this.subscriptions || [];

    subscription = Ember.A(subscriptions).find(function(sub) {
      return sub.listenable === listenable;
    });

    Ember.assert('Failed to find listenable to stopListeningTo', !!subscription);

    subscription.stop();
  },
  /**
   * Stops all subscriptions and empties subscriptions array
   */
  stopListeningToAll: function() {
    let subscription,
        subscriptions = this.subscriptions || [],
        l = subscriptions.length - 1;

    for(let i = l; i >=0; i--) {
      subscription = subscriptions[i];

      subscription.stop();
    }
  }
});
