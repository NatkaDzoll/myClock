		
  /*===================================================================================*/
 /*                   				   V I E W  									  */
/*===================================================================================*/
 /*	-------------------	 	CANVAS 	 	----------------- */
/*=======================================================*/
		function TclockViewCanvas(UTC) {

			var myModel = null;
			var myField = null;
			var context = null;
			var UTC = UTC;
			var container = null;
			var canvas = null;
			var buttoStop = null;
			var buttonStart = null;
/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
			this.init = function(model, field) {
				myModel =  model;
				myField = field;
				myModel.startClock();
				this.createDiv = function (tag, classN, insert) {  	//---------------- (тег, класс, куда помещаем)
					this.el = document.createElement(tag);
					this.el.className = classN;
					if (insert == '.time') {
						myField.appendChild(this.el);
						return this.el
					}
					myField.querySelector(insert).appendChild(this.el);
					return this.el;
				}
/*-----------------------------------
	СОЗДАЕМ КНОПКИ
------------------------------------*/				
				container = this.createDiv('div','cont', '.time');	//--------------------- создаем container, для часов и кнопок

				buttoStop = this.createDiv('input','butStop','.cont');	//----------------- создаем кнопку "STOP"
				buttoStop.type = 'button';
				buttoStop.value = 'STOP';

				buttonStart = this.createDiv('input','butStart','.cont'); //--------------- создаем кнопку "START"
				buttonStart.type = 'button';
				buttonStart.value = 'START';

				canvas =  this.createDiv('canvas','canvas','.cont')
				canvas.height="300";
				canvas.width="300"
			
			}

			this.updateTime = function () {
/*-----------------------------------
	МЕТОД СОЗДАНИЯ Canvas ЦИФЕРБЛАТА
-----------------------------------*/
		    	
		        context = canvas.getContext('2d');
		        context.save();// помещаем текущий контекст в стэк
		       	context.clearRect(0,0,300,300);
				context.translate(150, 150);
				context.scale(1,1);
				context.rotate(-Math.PI/2);

				context.strokeStyle = "black";
				context.fillStyle = "black";
				context.lineWidth = 2;
				context.lineCap = "round";

				context.save();
				context.beginPath();

				for (var i = 0; i < 12; i++) {
	            	context.rotate(Math.PI/6);
					context.moveTo(120,0);
					context.lineTo(130,0);
        		}
				context.stroke();		// ---------------- нарисовали то, что ранее описали
				context.restore();		// ---------------- достаем последний сохраненный контекст из стэка

				context.save();
				
				var time = new Date();
		        var sec = time.getUTCSeconds();
		        var min = time.getUTCMinutes();
		        var hour = time.getUTCHours() + UTC;
/*-----------------------------------
	РИСУЕМ ЧАСОВУЮ СТРЕЛКУ
	(вращая холст)
-----------------------------------*/
				context.strokeStyle = "#494949";// цвет контура
				context.fillStyle = "#D6D6D6";
				context.rotate((Math.PI/6)*hour +
				(Math.PI/360)*min +
				(Math.PI/21600)*sec);
				context.lineWidth = 7;
				context.shadowColor = "#000000";
				context.shadowBlur = 8;
				context.shadowOffsetX = 2;
				context.shadowOffsetY = 2;
				context.beginPath();
				context.moveTo(-20,0);
				context.lineTo(80,0);
				context.stroke();
				context.restore();

				context.save();

/*-----------------------------------
	РИСУЕМ МИНУТНУЮ СТРЕЛКУ
-----------------------------------*/				
				context.strokeStyle = "#F2F2F2"; // ---------------- цвет контура
				context.fillStyle = "#0C2217";
				context.rotate((Math.PI/30*min) + (Math.PI/1800)*sec);
				context.lineWidth = 5;
				context.shadowColor = "#000000";
				context.shadowBlur = 5;
				context.shadowOffsetX = 2;
				context.shadowOffsetY = 2;

				context.beginPath();
				context.moveTo(-28,0);
				context.lineTo(100,0);
				context.stroke();
				context.restore();

				context.save();

/*-----------------------------------
	РИСУЕМ МИНУТНУЮ СТРЕЛКУ
-----------------------------------*/					
				context.rotate(sec * Math.PI/30);
				context.strokeStyle = "#D40000";  // --------------- цвет контура
				context.fillStyle = "#D40000";
				context.lineWidth = 1;
				context.shadowColor = "#000000";
				context.shadowBlur = 5;
				context.shadowOffsetX = 1;
				context.shadowOffsetY = 1;

				context.beginPath();
				context.moveTo(-30,0);
				context.lineTo(130,0);
				context.stroke();
				context.restore();

				context.restore();
			}
		}
    		