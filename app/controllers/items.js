import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
  	pushItem: function() {
  		var newItem = this.store.createRecord('item', {
        title: this.get('title'),
        category: this.get('category')
      });
      newItem.save();
  	},
    removeItem: function() {
      var item = this.get('item');
      item.destroyRecord().then(function() {
        item.save();
      });
    }
  }
});
