/**
 * Created by liran on 15/09/2016.
 */

var resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];
var reactive = new Ractive({

    el: '#container',

    template: '#resource',

    data: {resourceList: resources},
});

reactive.on({
    addResource: function(event){
        console.log(event.node.description.value);
        var description = event.node.description.value;
        var url = event.node.url.value;
        if(description != '' && url != ''){
            var data = {'ResourceAddress': url, 'ResourceDescription': description};
            resources.push(data);
            event.node.description.value = '';
            event.node.url.value = '';
        }
        return false;
    },
    removeResource: function(event, index){
        resources.splice(index, 1);
    },
    showResource: function(){
        alert(JSON.stringify(resources));
    }
});