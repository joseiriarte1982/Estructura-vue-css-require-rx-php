require(['rx','vue','myheader','jquery','vueRx'],function(Rx,Vue,MyHeader,$,VueRx){
if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
  Vue.use(VueRx, Rx);
  
}

Vue.component('game-header', {
	template: '<h1>Video Games</h1>'
})
Vue.component('game-add', {
	template: '<div v-bind:style="{margin:\'20px 0px\'}"><input type="text" class="form-control" v-model="titleGame"/><button  v-bind:style="{margin:\'10px 0px\'}" @click="emitNewGame">Agregar</button></div>',
	data: function(){
		return {
			titleGame: null
		}
	},
	methods: {
		emitNewGame: function(){
			if(this.titleGame){
				this.$emit('new', {title: this.titleGame});
				this.titleGame = null
			}
		}
	}
})
Vue.component('game-list', {
	props:['games'],
	template: '<ul class="nav nav-pills"><game-item v-for="item in games" :game="item" :key="item.id"></game-item></ul>'
})
Vue.component('game-item', {
	props:['game'],
	data: function(){
		return{
			mostrar:true
		}
	},
	template: '<li class="active" v-show="mostrar"><a href="#">{{game.title}} &nbsp;<span @click="thisParent">X</span>&nbsp;<span @click="viewLocal">View</span> </a></li>',
	methods: {
		thisParent: function(){
			this.mostrar = !this.mostrar
		},
		viewLocal: function(){
			let games = localStorage.getItem("games");
			console.log(games)
			games = JSON.parse(games);
			console.log(games);
		}
	}
})
const app = new Vue({
	el: '#app',
	template: '<div class="view container" v-on:onload="alertMe"><game-header></game-header><game-add @new="addNewGames"></game-add><game-list v-bind:games="games"></game-list>',
	data:{
		games: [
			{title:'Mario Bros'},
			{title: 'Contra'},
			{title: 'Packman'}
		]
		
	},
	methods:{
		addNewGames: function(game){
			this.games.push(game)
			let jsonGames = JSON.stringify(this.games)
			localStorage.setItem("games",jsonGames);
		
		},
		alertMe: function(){
			console.log('hola')
		}
		
	}
	
})
})