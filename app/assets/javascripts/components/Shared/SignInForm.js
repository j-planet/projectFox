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

var SignInForm = React.createClass({

  getInitialState: function() {
    return {
      showModal: false,
      canSubmit: false
    };
  },
  componentWillReceiveProps: function(nextProp){
    if(nextProp.session.isLoggedIn){
      this.closeModal();
    }
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
  popupFBLogin: function(e) {
    sessionStorage.setItem('currentUrl', location.href);
	},
	popupTWLogin: function(e) {
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
    SessionActions.login(model.userlogin,model.userpassword);
  },

  toggleSignUp: function(){
    this.closeModal();
    this.props.toggleSignUp();
  },

  render: function() {

    var session = this.props.session;
    if (session.isLoggedIn == false && session.error != null){
      var errorMsg = 'Invalid login';
    }

    return (
      
      // <li className="cta tab">
      //   <a onClick={this.openModal} >{this.props.btnText}</a>
       
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Body>
            <div className='modal-body'>
              <div className="lead-form" style={{"marginTop":"0","marginBottom":"0"}}>
                <div className="close" type="button" onClick={this.closeModal}><span aria-hidden="true">&times;</span></div>
                <h2>Sign In</h2>
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
                    
                    <FormInput type="email" validations="isEmail" autofocus="autofocus" class="name" id="user_login" maxlength="320" name="userlogin" placeholder="Enter your email" required size="320" />
                    <FormInput autoComplete="off" id="user_password" maxlength="50" name="userpassword" placeholder="Enter you password" required size="50" type="password" />
                    
                    <Button bsStyle="link" className=" btn btn-lg btn-primary btn-block" disabled={!this.state.canSubmit} type="submit" >Sign In</Button>
                     
                    <p></p>
                    <a onClick={this.toggleSignUp}> Don't have an account? SIGN UP </a>
                    
                  {/*
                      <a href="/password/new" target="_blank"><%= t('authentication.forgot_your_password') %></a><br>
                  */}

                  </div>
                </Formsy.Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      // </li>
    );
  }
});

module.exports = SignInForm;

