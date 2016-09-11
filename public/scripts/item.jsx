var Item = React.createClass({
  dragStartHandler: function(e) {
    console.log("Start drag" + e);
    // e. preventDefault();
    // debugger;
    console.log("Target id:" + e.target.id);
    e.dataTransfer.dropEffect = "move";
  },
  dragEndHandler: function(e) {
    console.log("Drag end");
  },
  render: function() {
    return (
      <li className="item" draggable="true" onDragStart={this.dragStartHandler} onDrop={this.dropHandler}>
        <p>{this.props.weight}    {this.props.text}</p>
      </li>
    );
  }
});