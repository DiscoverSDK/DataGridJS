var resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];

var MainApp = React.createClass({
	getInitialState: function() {
		return {items : resources};	
	},
	addItems: function(newItem){
		resources = resources.concat([newItem]);
		this.setState({items: resources});
	},
	removeItem: function(itemIndex){
		resources.splice(itemIndex, 1);
		this.setState({items: resources});
	},
	show: function(){
		alert(JSON.stringify(resources));
	},
	render: function(){ 
		return (
			<fieldset>
			<div>
				<h3>Add Resources</h3>
				<AddResourceForm onFormSubmit={this.addItems} />
				<a href="#" onClick={this.show}>Show</a>
				<h3>List of Resources</h3>
				<RecourceList items={this.state.items} removeItem={this.removeItem} /> 
			</div>
			</fieldset>
		); 
	} 
});

var RecourceList = React.createClass({ 
	render: function() {
		var that = this;
		var st = {
			backgroundColor: '#3b97d3',
			color: '#fff',
			padding: '5px',
			borderRight: 'solid 1px #3b97d3',
			borderLeft: 'solid 1px #fff'
		};
		var st2 = {
			padding: '5px',
			borderRight: 'solid 1px #d4d4d4',
			width: '250'
		}
		var createItem = function(itemText) { 
			return ( 
				<ResourceListItem removeItem={that.props.removeItem}>{itemText}</ResourceListItem> 
			); 
		};
		
		return (
			<table>
				<thead>
					<tr style={st}>
						<td style={st2}>Description</td>
						<td style={st2}>Url</td>
						<td>Options</td>
					</tr>
				</thead>
				<tbody>
					{this.props.items.map(createItem)}
				</tbody>
			</table>
		) 
	},

});

var ResourceListItem = React.createClass({
	removeItem: function(e, index){
		this.props.removeItem(resources.indexOf(this.props.children));
	},
	render: function(){ 
		return (
			<tr>
			<td>{this.props.children.ResourceDescription}</td>
			<td>{this.props.children.ResourceAddress}</td>
			<td><button onClick={this.removeItem.bind(null, this.props.children)}>remove</button></td>
			</tr>
		); 
	} 
});

var AddResourceForm = React.createClass({

	getInitialState: function() {
		return {description: '', url: ''}; 
	}, 
	handleSubmit: function(e){ 
		e.preventDefault();
		if(this.state.url == "" || this.state.description == ""){
			return true;
		}
		var data = {'ResourceAddress': this.state.url, 'ResourceDescription': this.state.description};
		this.props.onFormSubmit(data); 
		this.setState({description: '', url: ''}); 
		//React.findDOMNode(this.refs.item).focus(); 
		return; 
	},
	onChangeDescription: function(e){ 
		this.setState({ description: e.target.value }); 
	},  
	onChangeUrl: function(e){ 
		this.setState({ url: e.target.value }); 
	},

	render: function(){
		var st2 = {
				height: '20px',
				fontSize: '14px',
				width: '220'
			};
		return (
			
			<form onSubmit={this.handleSubmit}> 
				<span style={st2}>Description:</span>
            	<input style={st2} type="text" ref='description' onChange={this.onChangeDescription} value={this.state.description} />
            	<span style={st2}> URL:</span>
            	<input type="text" ref='url' onChange={this.onChangeUrl} value={this.state.url}  style={st2}/>
            	<input type="submit" name="submit" value="add" />
            </form>
            

		); 
	} 
});

ReactDOM.render(
  <MainApp/>,
  document.getElementById('content')
);