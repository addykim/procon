var List = React.createClass({
  dragEnterHandler: function(e) {
    console.log("Entered " + e.target.id);
  },
  dragOverHandler: function(e) {
    e.preventDefault();
    // dragging over this category
    console.log("Dragging over " + e.target.id);
    return false;
  }, 
  dragLeaveHandler: function(e) {
    // This doesn't work quite right
    // console.log("Left " + e.target.id);

    // Remove from list
  },
  dropHandler: function(e) {
    console.log("Drop" + e);
    // e.preventDefault();
    // Set title
    // Set description
    // Set weight
    // Set category
    // Set index
    // Set Id
    // Set dragImage
  },
  render: function() {
  	var pros = [];
  	var cons = [];
  	var uncategorized = [];
		this.props.data.forEach(function(item) {
      var singleItem = 
          <Item 
        		key={item.id}
            category={item.category}
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
      <div>
        <div className="item-list">
          <h3 id="pro-header">Pro</h3>
          <ul id="pros-list" 
            onDragEnter={this.dragEnterHandler} onDragOver={this.dragOverHandler}
            onDragLeave={this.dragLeaveHandler} onDrop={this.dropHandler}>
            {pros}
          </ul>
        </div>
        <div className="item-list">
          <h3 id="con-header">Con</h3>
          <ul id="cons-list"
            onDragEnter={this.dragEnterHandler} onDragOver={this.dragOverHandler}
            onDragLeave={this.dragLeaveHandler} onDrop={this.dropHandler}>
            {cons}
          </ul>
        </div>
        <div className="item-list">
          <h3 id="uncategorized-header">Uncategorized</h3>
          <ul id="uncategorized-list"
            onDragEnter={this.dragEnterHandler} onDragOver={this.dragOverHandler}
            onDragLeave={this.dragLeaveHandler} onDrop={this.dropHandler}>
            {uncategorized}
          </ul>
        </div>
      </div>
    );
  }
});