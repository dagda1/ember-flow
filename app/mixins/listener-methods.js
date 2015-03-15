import Ember from 'ember';

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
  }
});
