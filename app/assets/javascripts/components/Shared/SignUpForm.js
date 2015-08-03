var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Formsy = require('formsy-react');
// Actions
var AppActions = require('../../actions/AppActions');
var SessionActions = require('../../actions/SessionActions');
// Components
var FormInput = require('./FormInput');

var SignUpForm = React.createClass({

  getInitialState: function() {
    return {
      showModal: false,
      canSubmit: false
    };
  },
  closeModal: function(){
    this.setState({
      showModal: false
    });
  },
  openModal: function(){
    this.setState({
      showModal: true
    });
  },
  popupFBLogin: function() {
    sessionStorage.setItem('currentUrl', location.href);
	},
	popupTWLogin: function() {
    sessionStorage.setItem('currentUrl', location.href);
	},
	enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  submit: function(model){
    var data = {username: model.username, useremail: model.useremail, userpassword: model.userpassword, userpasswordConfirmation: model.userpasswordConfirmation}
    SessionActions.signup(data);
  },

  render: function() {

    var session = this.props.session;
    if (session && session.isLoggedIn == false && session.error != null){
      var errorMsg = session.error.responseJSON.error;
    } 

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <div className='modal-body'>
          <div className="lead-form" style={{"marginTop":"0","marginBottom":"0"}}>
            <div className="close" type="button" onClick={this.closeModal}><span aria-hidden="true">&times;</span></div>
            <h2>Sign Up</h2>
            <div className="col-xs-12 col-sm-6" style={{"padding": "5px 10px"}}>
              <Button href="/auth/facebook" bsStyle='link' className="btn-lg btn-social btn-facebook" target="_top" style={{"width": "100%"}} onClick={this.popupFBLogin}>
                <i className="fa fa-facebook"></i> With Facebook
              </Button>
            </div>
            <div className="col-xs-12 col-sm-6" style={{"padding": "5px 10px"}}>
              <Button href="/auth/twitter" bsStyle='link' className="btn-lg btn-social btn-twitter" target="_top" style={{"width": "100%"}} onClick={this.popupTWLogin}>
                <i className="fa fa-twitter"></i> With Twitter
              </Button>
            </div>
            <p className="text-center" style={{"marginBottom": "10px"}}>OR</p>
            <p style={{"color":"red"}}>{errorMsg}</p>
            <Formsy.Form id="subscribe-form" className="user-form sign_up_user" id="sign_up_user" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
              <div className="controls">
                <FormInput autofocus="autofocus" className="name" id="user_username" maxlength="320" name="username" placeholder="Pick a username (alpha numeric only)" required size="320" type="text" />
                <FormInput validations="isEmail" validationError="This is not a valid email" id="user_email" maxlength="320" name="useremail" placeholder="Enter your email" required size="320" type="email" />
                <FormInput validations="minLength:8" validationError="Password is too short (minimum is 8 characters)" autoComplete="off" id="user_password" maxlength="50" name="userpassword" placeholder="Enter your password" required size="50" type="password" />
                <FormInput validations="equalsField:userpassword" validationError="The password doesn't match" autoComplete="off" id="user_password_confirmation" maxlength="50" name="userpasswordConfirmation" placeholder="Please Reenter your password" required size="50" type="password" />
                
                <Button bsStyle="link" className=" btn btn-lg btn-primary btn-block" disabled={!this.state.canSubmit} type="submit" >Sign Up</Button>

              </div>
            </Formsy.Form>
          </div>
        </div>
      </Modal>
    );
  },
});

module.exports = SignUpForm;
