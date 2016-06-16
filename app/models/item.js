import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  category: attr('string'),
  description: attr('string'),
  weight: attr('number'),
  rating: attr('number')
});
