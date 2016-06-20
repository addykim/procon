import DS from 'ember-data';

var Item = DS.Model.extend({
  title: DS.attr('string'),
  category: DS.attr('string')
});

Item.reopenClass({
  FIXTURES: [
  {
  	id: 1,
  	title: "yes",
  	category: "pro"
  }, {
	id: 2,		
  	title: "yes",
  	category: "pro"
  }, {
	id: 1,
  	title: "yes",
  	category: "pro"
  }
  ]
});

export default Item;