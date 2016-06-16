import DS from 'ember-data';

export default DS.Model.extend({
  category: DS.attr('string'),
  description: DS.attr('string'),
  weight: DS.attr('number'),
  rating: DS.attr('number')
});
