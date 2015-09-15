
/* JavaScript content from js/main.js in folder common */
var busyIndicator = null;
var alert1,alert2,alert3, alert4, alert5, alert6, alert7, alert9,alert8,alert10;
function wlCommonInit(){
	
	busyIndicator = new WL.BusyIndicator(null, {text : 'Loading...'});
	$('#BusyIndicatorStartButton').click(busyIndicatorDemo);
	$('#SimpleDialogStartButton').click(simpleDialogDemo);
	WL.Client.connect({onSuccess: onConnectSuccess, onFailure: onConnectFailure});
	$("#connectToServerButton").click(function(){
		WL.Client.connect({
			  onFailure: onConnectFailure
		});
		
	});
	
	WL.App.setKeepAliveInBackground(true);

	
}

function busyIndicatorDemo() {
	busyIndicator.show();
	setTimeout(function() {
		busyIndicator.hide();
	}, 5000);
	
	
}

function simpleDialogDemo(sec) {
	var dialogTitle = "CommonControls";
	var dialogText = "This is simple dialog text; take a look at the console";
	//------ UI Modification------------
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'UI Control'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 2000);
	alert7=	"UI Control Success";
	

	/*WL.SimpleDialog.show(dialogTitle, dialogText, [ {
		text : 'I am button 1',
		handler : simpleDialogButton1Click
	}, {
		text : 'I am button 2',
		handler : simpleDialogButton2Click
		
	}

	]);*/
	
	    
	
}



function simpleDialogButton1Click() {

	//WL.Logger.debug("simpleDialogButton1 Clicked");
	

}


function simpleDialogButton2Click() {
	//WL.Logger.debug("simpleDialogButton2 Clicked");


	

}



/*Form Based Authentication */
function getSecretData(){
	
	var resourceRequest = new WLResourceRequest("/adapters/DummyAdapter/getSecretData", WLResourceRequest.GET);
	resourceRequest.send().then(
			getSecretData_CallbackOK,
			getSecretData_CallbackFail
	);
	
}

function getSecretData_CallbackOK(response){
	// $("#ResponseDiv").html(JSON.stringify(response.responseJSON));
	//------ UI Modification------------
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'Form Auth'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 1500);
	alert10 = "Form Based Authentication Success";
}

function getSecretData_CallbackFail(response){
	//$("#ResponseDiv").html(JSON.stringify(response.responseJSON));
	alert10 = "Form Based Failed";
}


/*Push Notification */


function onConnectSuccess() {
	WL.Logger.debug ("Successfully connected to MobileFirst Server.");
}

function onConnectFailure() {
	WL.Logger.debug ("Failed connecting to MobileFirst Server.");
	WL.SimpleDialog.show("Push Notifications", "Failed connecting to MobileFirst Server. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadapp
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

function isPushSupported() {
	var isSupported = false;
	if (WL.Client.Push){
		isSupported = WL.Client.Push.isPushSupported();
	}	
	//alert(isSupported);
	if(isSupported == true){
		//------ UI Modification------------
		busyIndicator2 = new WL.BusyIndicator(null, {text : 'Push Support'});
		busyIndicator2.show();
		setTimeout(function() {
			busyIndicator2.hide();
		}, 1500);
		alert1 = "Push Supported = TRUE";
	}
	else{
		alert1 = "Push Not Supported";
	}
}

function isPushSubscribed() {
	var isSubscribed = false;
	if (WL.Client.Push){
		isSubscribed = WL.Client.Push.isSubscribed('myPush');
	}
	//alert(isSubscribed);
	if(isSubscribed == false){
		//------ UI Modification------------
		busyIndicator2 = new WL.BusyIndicator(null, {text : 'Push Subscribe'});
		busyIndicator2.show();
		setTimeout(function() {
			busyIndicator2.hide();
		}, 1500);
		alert2 = "Push Subcribed = FALSE";
	}
	else{
		alert2 = "Push Subcribed Success";
	}
}

//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {	
	WL.Client.Push.onReadyToSubscribe = function() {
//		alert("onReadyToSubscribe");
		
		$('#SubscribeButton').removeAttr('disabled');
		$('#UnsubscribeButton').removeAttr('disabled');

		WL.Client.Push.registerEventSourceCallback(
			"myPush", 
			"PushAdapter", 
			"PushEventSource", 
			pushNotificationReceived);
	};
}

// --------------------------------- Subscribe ------------------------------------
function doSubscribe() {
	WL.Client.Push.subscribe("myPush", {
		onSuccess: doSubscribeSuccess,
		onFailure: doSubscribeFailure
	});
}

function doSubscribeSuccess() {
	//alert("doSubscribeSuccess");
	
	//------ UI Modification------------
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'Push Subscribed'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 1500);
		alert3 = "Push Subscribe Success";
	
	
}

function doSubscribeFailure() {
//	alert("doSubscribeFailure");
	alert3 = "Push Subscribe Failure";
	
}

//------------------------------- Unsubscribe ---------------------------------------
function doUnsubscribe() {
	WL.Client.Push.unsubscribe("myPush", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess() {
	//alert("doUnsubscribeSuccess");
	//------ UI Modification------------
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'Unsubcribing'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 1500);
	alert4 = "Unsubscribe Success";
	
}

function doUnsubscribeFailure() {
	//------ UI Modification-----------
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'Unsubcribing'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 1500);
	//alert("doUnsubscribeFailure");
	alert4 = "Unsubscribe Failed";
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
	alert("pushNotificationReceived invoked");
	alert("props :: " + JSON.stringify(props));
	alert("payload :: " + JSON.stringify(payload));
}




function onConnectFailure(data){
	/*WL.SimpleDialog.show("Custom Device Provisioning", "Service not available. Try again later.", 
		[{
			text : 'Reload',
			handler : WL.Client.reloadApp 
		},
		{
			text: 'Close',
			handler : function() {}
		}]);*/
	
	alert8 = "Custom Device Provisioning Failed";
}



//------------------------------------- Java Adapters -------------------------------------------------

function getRate(){
	
	var req = new WLResourceRequest("/adapters/MyAdapter/API/convertCurrency/USD/EUR", WLResourceRequest.GET);
	req.send().then(function(resp){
		//alert(resp.responseText);
		
		//------ UI Modification------------
		busyIndicator2 = new WL.BusyIndicator(null, {text : 'Java Adapter'});
		busyIndicator2.show();
		setTimeout(function() {
			busyIndicator2.hide();
		}, 1500);
		//alert5 = resp.responseText;
		alert5 = "Java Adapter Success";
	});
	
}

//------------------------------------- Custom Authentication Module -------------------------------------

function getDataFromJSAdapter(){
	var invocationData = {
			adapter:"JSDataAdapter",
			procedure:"getSecretData",
			parameters:[]
	};
	
//	WL.Client.invokeProcedure(invocationData).then(function(response){
//		WL.Logger.debug("Received response!");
//		$("#output").val(JSON.stringify(response.invocationResult));
//        $('#output').format({method: 'json'});
//	});
	
	var request = new WLResourceRequest("/adapters/JSDataAdapter/getSecretData", WLResourceRequest.GET);
	request.send().then(function(response){
		
		//------ UI Modification------------
		busyIndicator2 = new WL.BusyIndicator(null, {text : 'Custom Auth'});
		busyIndicator2.show();
		setTimeout(function() {
			busyIndicator2.hide();
		}, 1500);
		alert9 = "Custom Authentication Success";
		WL.Logger.debug("Received response!");
		
		$("#output").val(response.responseText);
        $('#output').format({method: 'json'});
	});
	
	
}

var challengeHandler = WL.Client.createWLChallengeHandler("CustomRealm");
challengeHandler.logger = WL.Logger.create({pkg:"challengeHandler"});

challengeHandler.handleChallenge = function(challenge){
    var authStatus = challenge.authStatus;
	this.logger.info("handleChallenge :: authStatus :: " + authStatus)
 
    if (authStatus == "credentialsRequired"){
       /* $("#MainPage").hide();
        $("#LoginPage").show();
        $("#username").empty();
        $("#password").empty();*/
    	 challengeHandler.submitChallengeAnswer({
         	username: "mfp",
         	password: "mfp"
         })
 
        if (challenge.errorMessage){
           // $("#errorMessage").html(challenge.errorMessage);
        	alert9 = "Custom Authentication Failed";
           
        }
    } 
}

function loginButtonClick(){
    /*challengeHandler.submitChallengeAnswer({
    	username: $("#username").val(),
    	password: $("#password").val()
    })*/
}

challengeHandler.processSuccess = function (data){
	this.logger.info("processSuccess ::", data);
    $("#LoginPage").hide();
    $("#MainPage").show();
}

challengeHandler.handleFailure = function (data){
	this.logger.info("handleFailure ::", data);
    $("#LoginPage").hide();
    $("#MainPage").show();
	$("#output").val(JSON.stringify(data));
    $('#output').format({method: 'json'});
    alert9 = "Custom Authentication Failed";
}

//---------------------------------------- Double Step Authentication ---------------------------------------



function getSecretDataDouble(){	
	var resourceRequest = new WLResourceRequest("/adapters/DoubleStepAuthAdapter/getSecretDataDouble", WLResourceRequest.GET, 30000);
	resourceRequest.send().then(
		getSecretDataDouble_CallbackOK,
		getSecretDataDouble_CallbackFail
	);
}

function getSecretDataDouble_CallbackOK(response){
	//$("#ResponseDiv").html(JSON.stringify(response.responseJSON));
	busyIndicator2 = new WL.BusyIndicator(null, {text : 'Adapter Auth'});
	busyIndicator2.show();
	setTimeout(function() {
		busyIndicator2.hide();
	}, 1500);
	alert8 = "Adapter Authentication Success";
}

function getSecretDataDouble_CallbackFail(response){
	//$("#ResponseDiv").html(JSON.stringify(response.responseJSON));
	alert8 = "Adapter Authentication Failed";
}

// ----------------------------------------- Display Alerts --------------------------------------------------
function alerts(){
	//document.write(alert1 +"\n" + alert2 + "\n"+ alert3 + "\n" + alert4 + "\n" + alert5 + "\n" + alert7 + "\n" + "\n" + alert8 + "\n" + alert9 + "\n" + alert10);
//document.getElementById("submitProvCodeButton").innerHTML = submitProvCodeButton + doSubscribeSuccess;
	window.alert(alert1 +"\n" + alert2 + "\n"+ alert3 + "\n" + alert4 + "\n" + "\n" + alert5 + "\n" + "\n" + alert7 + "\n" + "\n" + alert8 + "\n" + "\n" + alert9 + "\n" + "\n" + alert10);
}
/* JavaScript content from js/main.js in folder android */
/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/

// This method is invoked after loading the main HTML and successful initialization of the MobileFirst runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}