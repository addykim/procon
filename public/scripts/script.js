var Item = React.createClass({
  render: function() {
    return (
      <div className="item">
        <p>{this.props.weight}   <b>{this.props.author}</b> {this.props.text}</p>
      </div>
    );
  }
});

var ProsAndCons = React.createClass({
  loadItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleItemSubmit: function(item) {
    var items = this.state.data;
    // Optimistically set an id on the new item. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    item.id = Date.now();
    var newItems = items.concat([item]);
    this.setState({data: newItems});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: items});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="">
        <Form onItemSubmit={this.handleItemSubmit} />
        <List data={this.state.data} />
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
  	var pros = [];
  	var cons = [];
  	var uncategorized = [];
		this.props.data.forEach(function(item) {
			var singleItem = <Item 
        		key={item.id}
        		author={item.author}
        		text={item.text}
        		weight={item.weight}
        	/>;
    	if (item.category === "pro") {
    		pros.push(singleItem);
      }
  		else if (item.category === "con") {
  			cons.push(singleItem);
      }
			else
				uncategorized.push(singleItem);
    });
    return (
      <div className="">
      <h3>Pro</h3>
        {pros}
      <h3>Con</h3>
      	{cons}
    	<h3>Uncategorized</h3>
    		{uncategorized}
      </div>
    );
  }
});

var Form = React.createClass({
  getInitialState: function() {
    return {category: '', author: '', text: '', weight: 0};
  },
  handleCategoryChange: function(e) {
  	this.setState({category: e.target.value});
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleWeightChange: function(e) {
  	this.setState({weight: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var category = this.state.category;
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var weight = this.state.weight;
    if (!text || !author) {
      return;
    }
    this.props.onItemSubmit({
    	category: category, 
    	author: author, 
    	text: text, 
    	weight: weight
    	});
    this.setState({category: '', author: '', text: '', weight: 0});
  },
  render: function() {
    return (
      <form className="" onSubmit={this.handleSubmit}>
        Pro 
        <input 
          type="radio"
          name="category"
          value="pro"
          onChange={this.handleCategoryChange}
        />
        Con 
        <input
          type="radio"
          name="category"
          value="con"
          onChange={this.handleCategoryChange}
        />
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
        	type="number"
        	value={this.state.weight}
        	onChange={this.handleWeightChange}
      	/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <ProsAndCons url="/api/items" pollInterval={2000} />,
  document.getElementById('content')
);