'use strict';

function attendanceReg() {
	this.goal = "Franklin";
	this.loginPage = document.getElementById("loginPage");
	this.registerPage = document.getElementById("registerPage");
	this.userPage = document.getElementById("userPage");
	this.forgotPass = document.getElementById("forgotPass");
	this.lEmail = document.getElementById("lEmail");
	this.lPassW = document.getElementById("lPassW");
	this.remember_mer = document.getElementById("remember-me");
	this.login_submit = document.getElementById("loginSubmit");
	this.forgot_pass = document.getElementById("noPassW");
	this.forgotPassBtn = document.getElementById('getPassSubmit');
	this.not_yet_memeber = document.getElementById("notMember");	
	this.myUsername = document.getElementById("username");
	this.regEmail = document.getElementById("regEmail");
	this.regPassW = document.getElementById("regPassW");
	this.regCPassW = document.getElementById("regCPassW");
	this.regSubmit = document.getElementById("regSubmit");
	this.already_memeber = document.getElementById("isMember");
	this.already_memeber2 = document.getElementById("isMember2");
	this.noPassW = document.getElementById("noPassW");
	this.signOutBtn = document.getElementById("signOut");
	this.myEvent = document.getElementById("myEvent");
	this.attendBtn = document.getElementById("attendBtn");
	this.welcomeMsg = document.getElementById("welcomeMsg");
	this.regMsg = document.getElementById("snackBar");
	this.get4gotPassW = document.getElementById('getPassW');


	this.not_yet_memeber.addEventListener('click', this.gotoRegisterPage.bind(this));
	this.already_memeber.addEventListener('click', this.gotoMemberPage.bind(this));
	this.already_memeber2.addEventListener('click', this.gotoMemberPage.bind(this));
	this.noPassW.addEventListener('click', this.gotoForgotPass.bind(this));
	this.regCPassW.addEventListener('keyup', this.checkCPassW.bind(this));
	this.regPassW.addEventListener('keyup', this.checkPassW.bind(this));
	this.forgotPassBtn.addEventListener('click', this.forgotPassBtnListener.bind(this));


	this.regSubmit.addEventListener('click', this.signUp.bind(this));
	this.login_submit.addEventListener('click', this.signIn.bind(this));
	this.signOutBtn.addEventListener('click', this.signOut.bind(this));
	//this.attendBtn.addEventListener('click', this.saveEvent.bind(this));
	
	//this.regPassW.addEventListener('keyup', this.passW.bind(this));


	//create firebase object variable
	this.initFirebase();
}

attendanceReg.prototype.signOut=function(){
	this.auth.signOut().then(function(){
		window.alert("SIgn Out Successfully");
		//window.open('index1.htm', '_blank');
		//var g = document.createElementNS('index1.htm');
		window.location = 'index1.htm';
		href = 'index1.htm';
	}).catch(function(error){
		window.alert("ERROR occured in SIgn Out");
	});
};

//Initialize Firebase and create shortcuts
attendanceReg.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  //this.theUser = firebase.auth().currentUser

  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

//Show Registration page
attendanceReg.prototype.gotoRegisterPage=function(){
  this.loginPage.setAttribute('hidden', 'true');
  this.registerPage.removeAttribute('hidden');
};

//Show Member Page
attendanceReg.prototype.gotoMemberPage = function(){
  this.registerPage.setAttribute('hidden', 'true');
  this.forgotPass.setAttribute('hidden', 'true');  
  this.userPage.setAttribute('hidden', 'true');

  // Show Sign up container
  this.loginPage.removeAttribute('hidden');
};

//Show Forgot password Page
attendanceReg.prototype.gotoForgotPass=function(){
  this.loginPage.setAttribute('hidden', 'true');
	this.forgotPass.removeAttribute('hidden');

};

//Show Register Page
attendanceReg.prototype.attendacePage = function(){
		// Hide sign-in and forgot-Password container.
  this.registerPage.setAttribute('hidden', 'true');
  this.loginPage.setAttribute('hidden', 'true');
  this.userPage.removeAttribute('hidden');
};
attendanceReg.prototype.checkPassW=function(){
	if(this.regPassW.value.length>5){
		this.regPassW.style.backgroundColor = 'white';
		this.regSubmit.title="Sign Up";
		this.regMsg.setAttribute('hidden', 'true');
	}
	else{
		this.regPassW.style.backgroundColor = 'red';
		this.regSubmit.disabled=true;
		this.regSubmit.title="Password must be 6 or more characters";
		this.regMsg.innerHTML = "Password must be 6 or more characters";
  	this.regMsg.removeAttribute('hidden');
	}
};

attendanceReg.prototype.checkCPassW=function(){
	if(this.regPassW.value === this.regCPassW.value & (this.regCPassW.value.length>5)){
		this.regCPassW.style.backgroundColor = 'white';
		this.regSubmit.disabled=false;
		this.regSubmit.title="Sign Up";
		this.regMsg.setAttribute('hidden', 'true');
	}
	else{
		this.regCPassW.style.backgroundColor = 'red';
		this.regSubmit.disabled=true;
		this.regSubmit.title="The Passwords did not match";
		this.regMsg.innerHTML = "The Passwords do not yet match";
  	this.regMsg.removeAttribute('hidden');
	}
};

//FORGOT Password Page
attendanceReg.prototype.forgotPassBtnListener = function(){

	this.auth.sendPasswordResetEmail(this.get4gotPassW.value).then(function() {
  		window.alert('Password Sent to Email Address');
  		already_memeber2.click();

		}, function(error) {
			window.alert('Email address not found!!');
			already_memeber2.click();
	});
}
//Sign up(REGISTER) Using Email and Password
attendanceReg.prototype.signUp=function(){	
		//var provider  = firebase.auth().createUserWithEmailAndPassword(regEmail.value, regPassW.value);
		var provider = this.auth.createUserWithEmailAndPassword(regEmail.value, regPassW.value);

		//Call function to send Verification Email
		this.verificationEmail();

		/*
	//Save Username
		var user = this.auth.currentUser;

	user.updateProfile({
	  displayName: this.myUsername.value,
	  photoURL: "https://example.com/jane-q-user/profile.jpg"
	}).then(function() {
	  // Update successful.
	}, function(error) {
	  // An error happened.
	});
		//console.log(provider);
		//window.alert(provider);
		//Get current User ID
		
		//this.saveUsername();
		*/
	
}

//Function for sending Verification Email
attendanceReg.prototype.verificationEmail = function(){
	var theUser = this.auth.currentUser
	this.theUser.sendEmailVerification().then(function() {
  window.alert("A verification Email has been sent to the address provided");
}, function(error) {
  window.alert("A verification Email could not be sent, please try again later");
});
}

//Sign in Using Email and Password Authentication
attendanceReg.prototype.signIn=function(){
	var provider = this.auth.signInWithEmailAndPassword(lEmail.value, lPassW.value);
	console.log(provider);
	//window.alert(provider);

}
// Triggers when the auth state change for instance when the user signs-in or signs-out.
attendanceReg.prototype.onAuthStateChanged= function(user) {

	if(user){
		this.attendacePage();
		this.getUsername();
		var userId = this.auth.currentUser.uid;
		console.log(this.myUsername.value);
		//this.gotoForgotPass();
		//window.location = 'index1.htm'		
	}
	else{
		console.log("User is Signed out");
		//this.gotoMemberPage();
		//window.location = 'index.htm';
	}
};	

//Save Data to FireBase DATABASE
attendanceReg.prototype.saveUsername=function(){
	var userId = this.auth.currentUser.uid;
  this.database.ref('users/' + userId).set({
  	//console.log(this.username);
    username: this.myUsername.value,
  });
}

//Get data from FIREBASE Database once
attendanceReg.prototype.getUsername=function(){/*
var userId = this.auth.currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  this.username = snapshot.val().username;
  this.welcomeMsg.innerHTML = "Welcome " + this.username;
  */
  var user = this.auth.currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}  
}

window.onload = function() {
  window.attendanceReg = new attendanceReg();
};
