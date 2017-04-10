'strict';
function attendanceRegUser () {
	//window.alert(Date.now());
	this.userTable = document.getElementById('theTable');
	this.tabEvent = document.getElementById('tabEvent');
	this.userEvent = document.getElementById('userEvent');
	this.userHome = document.getElementById('userHome');
	this.EventSubmitBtn = document.getElementById('EventSubmitBtn');
	this.timeAttended = document.getElementById('timeAttended');
	this.selectedEvent = document.getElementById('selectEvent');
	this.tabHome = document.getElementById('tabHome');
	this.adminSelectEvent = document.getElementById('adminSelectEvent');
	this.signOutBtn = document.getElementById('signOut');



	this.EventSubmitBtn.addEventListener('click', this.submitBtnListen.bind(this));
	this.tabEvent.addEventListener('click', this.eventListen.bind(this));
	this.tabHome.addEventListener('click', this.userHomeListen.bind(this));
	this.adminSelectEvent.addEventListener('change', this.changeEventView.bind(this));
	this.signOutBtn.addEventListener('click', this.signOutBtnListener);


	this.myA = [{theEvent:'Franklin', signIn:'4/9/2017 10:00PM', signOut:'Obinna', eventEndTime:'1491777934382'}, {theEvent:'tunde', signIn:'4/7/2017 10:00PM', signOut:'yussuf', eventEndTime:'1991777934382'}];
	//this.myB = {Franklin:{theEvent:'Football', signIn:'4/9/2017 10:00PM', signOut:'Obinna', eventEndTime:'1491777934382'}, {theEvent:'Church-Service', signIn:'4/7/2017 10:00PM', signOut:'yussuf', eventEndTime:'1991777934382'},
//Donald:{theEvent:'Wedding', signIn:'4/9/2017 10:00PM', signOut:'Obinna', eventEndTime:'1491777934382'}, {theEvent:'Board-Meeting', signIn:'4/7/2017 10:00PM', signOut:'yussuf', eventEndTime:'1991777934382'} };
	this.populateData();
}

attendanceRegUser.prototype.populateData = function(){
	for(var i=0; i<this.myA.length; i++){ 
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.innerText = this.myA[i].theEvent;
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerText = this.myA[i].signOut;
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerText = this.myA[i].signIn;
		tr.appendChild(td);

		//Event has passed
		if(Date.now() < this.myA[i].eventEndTime){
			td = document.createElement('td');
			td.innerHTML = '<button title=\'Leave Event\' id=\'Leave Event\'>Leave</button>';
			tr.appendChild(td);
		}

		this.userTable.appendChild(tr);
	}
}

attendanceRegUser.prototype.eventListen = function(){
	this.userHome.setAttribute('hidden', 'true');
	this.userEvent.removeAttribute('hidden');
}

attendanceRegUser.prototype.submitBtnListen = function(){
	if(this.selectedEvent.value.length > 3){
		this.timeAttended.removeAttribute('hidden');
	}		
}

attendanceRegUser.prototype.userHomeListen = function(){
	this.userEvent.setAttribute('hidden', 'true');
	this.userHome.removeAttribute('hidden');
}

attendanceRegUser.prototype.changeEventView = function(){
	//window.alert(this.adminSelectEvent.value);
	for(var p in this.myB){
		console.log(p);
	}
}

attendanceRegUser.prototype.signOutBtnListener = function(){
	window.location = 'index.htm';
}

window.onload = function(){
	window.attendanceRegUser = new attendanceRegUser();
}