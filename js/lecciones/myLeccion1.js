require(['rx','vue','myheader','jquery','vueRx'],function(Rx,Vue,MyHeader,$,VueRx){
if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
  Vue.use(VueRx, Rx);
  
}
require(['test'], function(MOUNTAINS){

function rowHeights(rows){

	return rows.map(function(row){
		
		return row.reduce(function(max, cell){
			return Math.max(max,cell.minHeight());
		},0);
	});
}
function rowWidths(rows){
	return rows[0].map(function(_,i){
		return rows.reduce(function(max, row){
			
		//console.log(row[i].minWidth())
			return Math.max(max,row[i].minWidth());
		},0);
	});
}

function drawTable(rows){
	var heights =  rowHeights(rows);
	var widths = rowWidths(rows);
	console.log(heights,widths)

	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo]
		}).join(" ");
	}
	function drawRow(row, rowNum){
		var blocks = row.map(function(cell, colNum){
			return cell.draw(widths[colNum], heights[rowNum])
		});
		return blocks[0].map(function(_,lineNo){
			return drawLine(blocks, lineNo);
		}).join("\n");
	}
	return rows.map(drawRow).join("\n")
}
function repeat(string,times){
	var result = "";
	for(var i=0;i<times;i++){
		result += string;
	}
	return result
}



function TextCell(text){
	this.text = text.split("\n");
}
TextCell.prototype.minWidth = function(){
	return this.text.reduce(function(width,line){
		return Math.max(width,line.length);
	},0);
};
TextCell.prototype.minHeight = function(){
	//console.log(this.text.length)
	return this.text.length;
}
TextCell.prototype.draw = function(width,height){
	var result = [];
	for(var i=0;i<height;i++){
		var line =  this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	return result;

};
/*
 var rows = [];
	for(var i = 0; i < 8; i++){
		var row = [];
		for(var j = 0; j<10;j++){
			if((j+i)%2 == 0)
				row.push(new TextCell("##"));
			else
				row.push(new TextCell("  "));
		}
		rows.push(row);

	}
//	console.log(rows)
console.log(drawTable(rows));
*/

function underlinedCell(inner){
  this.inner = inner;
}
underlinedCell.prototype.minWidth = function(){
  return this.inner.minWidth();
}
underlinedCell.prototype.minHeight =  function(){
	//console.log(this.inner.minHeight() + 1)
  return this.inner.minHeight() + 1;
}
underlinedCell.prototype.draw = function(width,height){
  return this.inner.draw(width, height - 1)
  .concat([repeat("-",width)])
}


function dataTable(data){
//	console.log(data)
	var keys = Object.keys(data[0]);
	
	var headers = keys.map(function(name){
		return new underlinedCell(new TextCell(name));
	});
	var body = data.map(function(row){
		return keys.map(function(name){
			return new TextCell(String(row[name]))
		} )
	})
	return [headers].concat(body)
}

console.log(drawTable(dataTable(MOUNTAINS))); 
//console.log(MOUNTAINS)
});

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