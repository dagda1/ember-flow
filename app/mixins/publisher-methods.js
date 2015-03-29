import Ember from 'ember';

export default Ember.Mixin.create(Ember.Evented, {
  /**
   * Subscribes the given callback for action triggered
   *
   * @param {Function} callback The callback to register as event handler
   * @param {Mixed} [optional] bindContext The context to bind the callback with
   * @returns {Function} Callback that unsubscribes the registered event handler
   */
  listen: function(callback, bindingContext) {
    bindingContext = bindingContext || this;

    let aborted = false;

    let eventHandler = function(args) {
      if(aborted) {
        return;
      }

      callback.apply(bindingContext, args);
    };

    this.on(this.eventLabel, this, eventHandler);

    return () => {
      aborted = true;
      this.off(this.eventLabel, this, eventHandler);
    };
  },

  triggerAsync: function() {
    let args = arguments;

    Ember.run.next(() =>
                   this.trigger.apply(this, args));
  }
});
