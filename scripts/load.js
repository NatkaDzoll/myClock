$(function(){
	var NewYork_M = new Tclock();
	var NewYork_V = new TclockViewDOM(-5);
	var NewYork_C = new TClockController();
	var  NewYorkBox = document.body.querySelector('#NewYork');
	NewYork_M.init(NewYork_V);
	NewYork_V.init(NewYork_M, NewYorkBox);
	NewYork_C.init(NewYork_M, NewYorkBox);

	var London_M = new Tclock();
	var London_V = new TclockViewDOM(0);
	var London_C = new TClockController();
	var  London = document.body.querySelector('#London');
	London_M.init(London_V);
	London_V.init(London_M, London);
	London_C.init(London_M, London);

	var Tokio_M = new Tclock();
	var Tokio_V = new TclockViewCanvas(9);
	var Tokio_C = new TClockController();
	var  Tokio=document.body.querySelector('#Tokio');
	Tokio_M.init(Tokio_V);
	Tokio_V.init(Tokio_M, Tokio);
	Tokio_C.init(Tokio_M, Tokio);

	var Minsk_M = new Tclock();
	var Minsk_V = new TclockViewCanvas(3);
	var Minsk_C = new TClockController();
	var  Minsk=document.body.querySelector('#Minsk');
	Minsk_M.init(Minsk_V);
	Minsk_V.init(Minsk_M, Minsk);
	Minsk_C.init(Minsk_M, Minsk);
}
