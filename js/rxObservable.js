
Rx.Observable.from(['Adrià', 'Jen', 'Sergi'])
.subscribe(
function(x) { console.log('Next: ' + x); },
function(err) { console.log('Error:', err); },
function() { console.log('Completed'); }
);

/*
Rx.Observable.fromEvent(document, 'click')
.filter(function(c) { return c.clientX > window.innerWidth / 2; })
.take(10)
.subscribe(function(c) { console.log(c.clientX, c.clientY) })
*/
var button = document.getElementById('boton')
var clickme = Rx.Observable.fromEvent(button, 'click');

clickme.subscribe(function(){
 Rx.Observable.fromEvent(document, 'click')
.filter(function(e) { return e.clientX > window.innerWidth / 2; })
.take(10).subscribe(function(e) { console.log(e.clientX, e.clientY) })
})
