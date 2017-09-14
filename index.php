<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <link rel="stylesheet" href="./css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/main.css">
  <link href="./css/styleLoginPage.css" rel="stylesheet">	
	
  <script src="./js/require.js"></script>
 
	<style>
	[v-cloak]{
		display:none;
	}
	.test{
		background:blue;
	}
	</style>
	<style type="text/css" id="vue-styles"></style>
</head>
<body>
<div id="app" class="container" v-cloak>
<div class="actions-container">
<button @click="fight">Luchar</button>
</div>
<!-- Casilla del jugador 1 -->
<div :class="['jugador box', { winner: player1.winner }]">
<select v-model="player1.pokemon" @change="resetWinner">
<option v-for="pokemon in pokemons" v-bind:value="pokemon">{{ pokemon.
name }}</option>
</select>
<jugador :class="player1.pokemon.name"></jugador>
</div>
<label>VS</label>
<!-- Casilla del jugador 2 -->
<div :class="['jugador box', { winner: player2.winner }]">
<jugador :class="player2.pokemon.name"></jugador>
<select v-model="player2.pokemon" @change="resetWinner">
<option v-for="pokemon in pokemons" v-bind:value="pokemon">{{ pokemon.
name }}</option>
</select>
</div>
<div class="jugador test"></div>
<div class="jugador otro-test"></div>
</div>	
<div id="vuerx" style="display:none;">
<div><h2>{{count}}</h2></div>
<button v-stream:click="add$">Add</button>
</div>

 <script>
  var base = "./"
	require(['./js/config.js'],function(){
	require(['counter']);
	})
	</script>
</body>
</html>