
  /*===================================================================================*/
 /*                   			  C O N T R O L L E R  								  */
/*===================================================================================*/

		function TClockController() {

			var myModel = null;
			var myField = null;

			this.init = function (model,field) {
				myModel=model;
				myField=field;

				var buttonStop = myField.querySelector('.butStop');
	            buttonStop.addEventListener('click',this.stopClock);

	 			var buttonStart = myField.querySelector('.butStart');
	            buttonStart.addEventListener('click',this.startClock);
	        }

	        this.stopClock = function () {
	        	clearInterval (myModel.begin);
	        }
	        this.startClock = function () {
	        	clearInterval (myModel.begin);
	        	myModel.startClock();
	        }

		}