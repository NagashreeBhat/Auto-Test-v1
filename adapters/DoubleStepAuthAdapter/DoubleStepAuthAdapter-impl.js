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

var userIdentity;

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired: true,
		authStep: 1,
		errorMessage: errorMessage
	};
}

function submitAuthStep1(username, password){
	if (username === "user" && password === "user"){
		WL.Logger.debug("Step 1 :: SUCCESS");
		userIdentity = {
				userId: username,
				displayName: username, 
				attributes: {}
		};

		return {
			authRequired: true,
			authStep: 2,
			question: "What is your pet's name?",
			errorMessage : ""
		};
	
	}
	
	else{
		WL.Logger.debug("Step 1 :: FAILURE");
		return onAuthRequired(null, "Invalid login credentials");
	}
}

function submitAuthStep2(answer){
	if (answer === "Lassie"){
		WL.Logger.debug("Step 2 :: SUCCESS");
		WL.Server.setActiveUser("DoubleStepAuthRealm", userIdentity);
		WL.Logger.debug("Authorized access granted");
		
		return {
			authRequired: false
		};
	}
	
	else{
		WL.Logger.debug("Step 2 :: FAILURE");
		return onAuthRequired(null, "Wrong security question answer");
	}
		
}

function getSecretDataDouble(){
	return {
		secretData: "Very very very very secret data"
	};
}

function onLogout(){
	WL.Logger.debug("Logged out");
}

