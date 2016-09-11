

var Form = React.createClass({
  getInitialState: function() {
    return {category: '', author: '', text: '', weight: 0};
  },
  handleCategoryChange: function(e) {
  	this.setState({category: e.target.vgalue});
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