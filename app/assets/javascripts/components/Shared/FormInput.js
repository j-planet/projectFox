/** @jsx React.DOM */
var Formsy = require('formsy-react');

var FormInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in 
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true 
    // when the value is empty and the required prop is 
    // passed to the input. showError() is true when the 
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        {/* <input id="subscribe_email" type="email" className="form-control" placeholder="Your email" onChange={this.changeValue} value={this.getValue()}/> */}
        <input size={this.props.size} autoComplete={this.props.autoComplete} autofocus={this.props.autofocus} id={this.props.id} type={this.props.type} className={this.props.className} placeholder={this.props.placeholder} onChange={this.changeValue} value={this.getValue()}/>
        <span style={{"display": "block", 'color':'red'}}>{errorMessage}</span> 
      </div>
    );
  }
});

module.exports = FormInput;