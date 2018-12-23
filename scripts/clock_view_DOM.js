		
  /*===================================================================================*/
 /*                   				   V I E W  									  */
/*===================================================================================*/

 /*	-------------------		 DOM 	-----------------  */
/*=====================================================*/
		function TclockViewDOM(UTC) {
			var myModel = null;
			var myField = null;
			var container= null;
			var buttonStart = null;
			var buttoStop = null;
			var clockFace = null;	// ---------------------------------------- циферблат
			
			var hourHand = null;
			var minuteHand = null;
			var secondHand = null;

			var digTime = null;

			var UTC = UTC;
/*-----------------------------------
	МЕТОД ИНИЦИАЛИЗАЦИИ MODEL
-----------------------------------*/
			this.init = function (model, field) {
				myModel = model;
				myField = field;
/*-----------------------------------
	МЕТОД СОЗДАНИЯ DIV ЭЛЕМЕНТОВ
-----------------------------------*/
				this.createDiv = function (tag, classN, insert) {  	//---------------- (тег, класс, куда помещаем)
					this.el = document.createElement(tag);
					this.el.className = classN;

					if (classN == 'num') {
						insert.appendChild(this.el);
						return this.el;
					}

					if (insert == '.time') {
					myField.appendChild(this.el);
					return this.el
					}

					myField.querySelector(insert).appendChild(this.el);
					return this.el;
				}

/*-----------------------------------
	МЕТОД ЗЕЛЕНЫХ КРУЖКОВ С НОМЕРАМИ
	ПО ЦИФЕРБЛАТУ
-----------------------------------*/
				this.painTickRound = function () {
					for ( var i=360; i>0; i-=30) {

						var Round = this.createDiv('div','round','.clockFace'); // --- вычисляем угол в радианах ( i + 30 градусов)
						var alfa = i*Math.PI/180; 			// ---------------------- вычислим радиус
						var radius = 140 - Round.offsetWidth/2;	// ------------------ математически высчитаем позицию кружков 	

						Round.style.left = 150 + radius*Math.sin(alfa) - Round.offsetWidth/2  + 'px';
						Round.style.top = 150 - radius*Math.cos(alfa) - Round.offsetHeight/2  + 'px';
						// -------------------------
						// 	 РАССТАВЛЯЕМ НОМЕРА
						var num = this.createDiv('span','num', Round);
						num.innerHTML = i/30 ; 
						num.style.top = parseInt(Round.offsetHeight)/2 - parseInt(num.offsetHeight)/2 + 'px';
						num.style.left = parseInt(Round.offsetWidth)/2 - parseInt(num.offsetWidth)/2 + 'px';
					}
				}

/*-----------------------------------
	СОЗДАЕМ ЭЛЕМЕНТЫ 
------------------------------------*/				
				container = this.createDiv('div','cont', ".time");	//--------------------- создаем container, для часов и кнопок

				buttoStop = this.createDiv('input','butStop','.cont');	//----------------- создаем кнопку "STOP"
				buttoStop.type = 'button';
				buttoStop.value = 'STOP';

				buttonStart = this.createDiv('input','butStart','.cont'); //--------------- создаем кнопку "START"
				buttonStart.type = 'button';
				buttonStart.value = 'START';

				clockFace = this.createDiv('div','clockFace','.cont')	//----------------- создаем циферблат

				this.painTickRound(); // ------------------------------------------ вызываем метод модели (построение зеленых кружочков)

/*-----------------------------------
	СОЗДАЕМ СТРЕЛКИ 
------------------------------------*/	
				hourHand = this.createDiv('div','hourHand','.clockFace'); 		
				myModel.handPosition(hourHand); 	//------------------------------ обращаемся в модель, которая вычисляет позицию стрелки

				minuteHand = this.createDiv('div','minuteHand','.clockFace');
				myModel.handPosition(minuteHand);

				secondHand = this.createDiv('div','secondHand','.clockFace');
				myModel.handPosition(secondHand);

/*-----------------------------------
	СОЗДАЕМ ЭЛЕКТРОННЫЙ ЦИФЕРБЛАТ
------------------------------------*/		
				digTime =  this.createDiv('div','digClock','.clockFace');

/*-----------------------------------
	ЗАПУСКАЕМ ЧАСЫ ПОСЛЕ СРАЗУ
	ОТРИСОВКИ СТРАНИЦЫ
------------------------------------*/				
				myModel.startClock();
			}

			  this.updateTime = function () {
				
				var time = new Date();
				
				var hours = time.getUTCHours() + UTC;
				var minutes = time.getUTCMinutes();
				var seconds = time.getUTCSeconds();
				var millisecont = time.getUTCMilliseconds();

				if (hours >= 24) {
					hours = hours-24;
				}
				
				secondHand.style.transform = 'rotate(' + (seconds  + millisecont/1000)*6 + 'deg)';;
		        minuteHand.style.transform = 'rotate(' + (minutes + 1 / 60 * seconds) * 6 + 'deg)';
		        hourHand.style.transform = 'rotate(' + (hours * 30 + 1 / 12 * (minutes + 1 / 60 * seconds) * 6) + 'deg)';
				
				digTime.innerHTML = strTime(hours, 2) + ':' + strTime(minutes, 2) + ':' + strTime(seconds, 2);
				
				//--------Дополняем строку нулями слева------
				function strTime(val,len) {  
		        	var strVal=val.toString();
		       		while ( strVal.length < len )
		            strVal='0'+strVal;
		       		return strVal;
				}
			}
		}