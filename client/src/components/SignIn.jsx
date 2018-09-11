/* global gapi */

import React from 'react';

class SignIn extends React.Component{

  constructor(props){
	super(props);
	this.onSignIn = this.onSignIn.bind(this)
	console.log(props);
  }

  componentDidMount() {
	console.log('this mounted')
	gapi.signin2.render('my-signin2', {
	  'scope': 'profile email',
	  'width': 250,
	  'height': 50,
	  'longtitle': true,
	  'theme': 'dark',
	  'onsuccess': this.onSignIn
	});
  }

  onSignIn(googleUser) {
	let profile = googleUser.getBasicProfile();
	this.props.handleSignIn(profile.getName());
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  render() {
	return(
	  <div>
		<div id="my-signin2" data-onsuccess={this.onSignIn}></div>
	  </div>
	)
  }
}

export default SignIn