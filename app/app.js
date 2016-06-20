import DS from 'ember-data';
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

// Store cache of all records available in an application
App.Store = DS.Store.extend({
  adapter: 'DS.FixtureAdapter'
});

// App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  // firebase: new Firebase('https://<my-firebase>.firebaseio.com')
// });

// App.ApplicationSerializer = DS.FirebaseSerializer.extend();

export default App;