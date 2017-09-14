require(['rx','vue','myheader','jquery','vueRx','vueFilter','vueCss'],function(Rx,Vue,MyHeader,$,VueRx,vueFilter,VueCss){
if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
  Vue.use(VueRx, Rx, vueFilter);
  
}
 Vue.use(vueFilter);
 Vue.use(VueCSS);

//console.log(Vue.filter.reduce)
Vue.component('jugador', {
template: `
<div class="jugador pokemon">
<div class="jugador pokemon-head"></div>
<div class="jugador pokemon-body"></div>
<div class="jugador pokemon-feet"></div>
</div>
`,
style: 
	'.pokemon { width: 3rem; display: inline-block; margin: 1rem; }'+
	'.box { display: inline-block; padding: 1rem; margin: 1rem; }'+
	'.box.winner { background: green; }'+
	'.pokemon-head, .pokemon-body { height: 3rem; }'+
	'.pokemon-feet { height: 1rem; }'+
	'.pokemon.bulvasaur .pokemon-head { background: #ff6a62; }'+
	'.pokemon.bulvasaur .pokemon-body { background: #62d5b4; }'+
	'.pokemon.bulvasaur .pokemon-feet { background: #317373; }'+
	'.pokemon.squirtle .pokemon-head, .pokemon.squirtle .pokemon-feet { background: #8bc5cd; }'+
	'.pokemon.squirtle .pokemon-body { background: #ffe69c; }'+
	'.pokemon.charmander { background: #de5239; }'+
	'.pokemon.pikachu { background: #f6e652;}'+
	'@media (max-width: 767px) {.test{width:200px;height:200px;background:red;}}'+
	'@media (max-width: 767px) {.otro-test{width:100px;height:100px;background:pink;}}'+
	'@media (min-width: 767px) {.test{width:200px;height:100px;background:green;}}'+
	'@media (min-width: 767px) {.otro-test{width:100px;height:100px;background:gray;}}'+
	'@font-face {font-family: "et-line";src:url("../fonts/et-line.eot");	src:url("../fonts/et-line.eot?#iefix") format("embedded-opentype"),		url("../fonts/et-line.woff") format("woff"),		url("../fonts/et-line.ttf") format("truetype"),		url("../fonts/et-line.svg#et-line") format("svg");	font-weight: normal;	font-style: normal;}'
	
});
const app = new Vue({
el: '#app',
data: {
	player1: { pokemon: {}, winner: false },
	player2: { pokemon: {}, winner: false },
	pokemons: [
	{ id: 0, name: 'pikachu', type: 'electro' },
	{ id: 1, name: 'bulvasaur', type: 'planta' },
	{ id: 2, name: 'squirtle', type: 'agua' },
	{ id: 3, name: 'charmander', type: 'fuego' }
	],
	results: [
	[0, 2, 1, 0],
	[1, 0, 2, 2],
	[2, 1, 0, 1],
	[0, 1, 2, 0],
	]
},
methods: {
	fight: function () {
		
	const result = this.results[this.player1.pokemon.id][this.player2.pokemon.
	id];
	console.log(result)
	const selectWinner = [
	() => { this.player1.winner = true; this.player2.winner = true; },
	// empate
	() => { this.player1.winner = true; this.player2.winner = false; },
	// gana jugador 1
	() => { this.player1.winner = false; this.player2.winner = true; }
	// gana jugador 2
	];
	selectWinner[result]();
	},
	resetWinner: function () {
	this.player1.winner = false;
	this.player2.winner = false;
	}
}
});



/*
var vm = new Vue({
	el:'#vuerx',
	subscriptions (){
		this.add$ = new Rx.Subject()
		return {
			count: this.add$.map(()=> 1 )
			.startWith(0)
			.scan((total, change) => total + change)
		}
	} 
})*/
})