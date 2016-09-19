var resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];



// Overall viewmodel for this screen, along with initial state
function ResourceViewModel() {
    var self = this;
	self.resources = ko.observableArray(resources);

	self.description = ko.observable("");
	self.url = ko.observable("");

	self.addResource = function(formElements){
		var description = self.description();
		var url = self.url();
		if(description && url){
			self.resources.push({'ResourceAddress': url, 'ResourceDescription': description});
			self.description('');
			self.url('');
		}else{
			return;
		}
	};

	self.removeResource = function(resource){
		self.resources.remove(resource);
	};

	self.showResource = function(){
		alert(JSON.stringify(resources));
	};
	
};



ko.applyBindings(new ResourceViewModel());