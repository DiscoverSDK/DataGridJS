var resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];

new Vue({
  el: '#app',
  data: {
  	description: '',
  	url: '',
  	resources: resources
  },
  methods: {
    addResource: function () {
      var description = this.description.trim();
      var url = this.url.trim();
      if (description && url) {
        this.resources.push({'ResourceAddress': url, 'ResourceDescription':description})
        this.description = '';
        this.url = '';
      }else{
      	return;
      }
    },
    removeResource: function (index) {
      this.resources.splice(index, 1)
    },
    showResource: function(){
    	alert(JSON.stringify(this.resources));
    }
  }
});