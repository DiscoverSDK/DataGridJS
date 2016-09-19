window.Ress = Ember.Application.create();
Ress.ApplicationAdapter = DS.FixtureAdapter.extend();

Ress.Router.map(function() {
  this.resource('ress', { path: '/' });
});

Ress.Res = DS.Model.extend({
  ResourceAddress: DS.attr('string'),
  ResourceDescription: DS.attr('string')
});

Ress.RessRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('res');
  }
});


Ress.Res.FIXTURES = [{id:1, ResourceAddress: 'http://www.discoversdk.com', ResourceDescription:'Great site'}];


Ress.RessController = Ember.ArrayController.extend({
  actions: {
    createRes: function() {
      var description = this.get('description');
      var url = this.get('url');
      if (!description.trim()) { return; }
      if (!url.trim()) { return; }


      var res = this.store.createRecord('res', {
        ResourceAddress: url,
        ResourceDescription: description
      });

      this.set('url', '');
      this.set('description', '');

      res.save();
    },
    showResource: function(){
      var resources = this.store.findAll('res').then(function(data){
        var allResources = data.map(function(x) { return x.toJSON(); });
        alert(JSON.stringify(allResources));
      });
    },
    removeRes: function (index) {
      this.store.find('res', index).then(function (post) {
        post.destroyRecord();
      });
    }
  }
});



Ress.ResController = Ember.ObjectController.extend({
  isCompleted: function(key, value){
    var model = this.get('model');
    if (value === undefined) {
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
});