<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/main.css">
  <link href="../css/styleLoginPage.css" rel="stylesheet">	
	
  <script src="../js/require.js"></script>
 
	<style>
	[v-cloak]{
		display:none;
	}
	.green{
		color:green;
	}
	</style>
</head>
<body>
<div id="app" class="container">
	<form action="leccionPHP.php" method="post">
		<label for="haystack">Entre el texto a analizar</label>
		<textarea name="haystack" id="haystack" class="form-control" rows="7">
		<?php if(isset($_POST['haystack'])){
			echo trim($_POST['haystack']);
		}?>
		</textarea>
		<label for="keyword">Entrar separado por coma</label>
		<input name="keyword" id="keyword" type="text" class="form-control" value="<?php if(isset($_POST['keyword'])){
			echo $_POST['keyword'];
		}?>">
		<button type="submit">Enviar</button>
	</form>
	<div id="findkeywords" v-cloak>
		<keywordcounter
			:data="keywordcounterData"
			:columns="keywordcounterColumns">
		</keywordcounter>			
	</div>
</div>
<script type="text/x-template" id="keywordcounter-template">
<table class="table table-hover">
	<thead>
	<tr>
		<th v-for="key in columns"
		style="cursor:pointer;"
		@click="sortBy(key)"
		:class="{active:sortKey == key}">
			{{ key}} 
			<span class="arrow"
				:class="sortOrders[key]>0?'asc':'dsc'">
			</span>
		</th>
	</tr>
	</thead>
	<tbody>
	<tr v-for="entry in data">
		<td v-for="key in columns">
		{{entry[key]}}
		</td>
	</tr>
	</tbody>
</table>	
</script>

 <script>
/*
LO que he aprendido sobre esta leccion de php
1.-Generalidades: esta pagina tiene una forma que se apunta a si misma, justo abajo esta el div root de vue el cual contiene un componente
con dos props, :data y :columns que recibe keywordcounterColumns como un array de titulos term y count y keywordcounterData que recibe un 
array de objetos que contienen term y count.

2.-Componentes: Nuestro componente tiene un template fuera de si mismo en un script text/x-template con un ID y el el campo template se refiere al 
id con el simbolo de numero como selector. tiene sus props, declarados ambos como arrays y dentro de data tiene this.colums el cual toma la 
info desde el prop que le llega del template :colums="keywordcounterColumns" en data del componente solo regresa sortKey y sortOrders ya que
la info es pasada a traves de props.

3.-Template: En nuestra tabla hace uso de v-for para los encabezados y los toma de columns, un array con dos elementos. Luego en nuestro cuerpo
en el tr hace uso de v-for otra vez para los objetos y por cada objeto vuelve a hacer uso de td, pero tomando la key de cada column key in columns = 2 a cada entry le 
saca su respectivo dato entry[key]

En on click en el header hacemos uso de la key in columns que llama la funcion sortBy que da nuevo valor a las dos variables del componente sortKey y sortOrders[key]
en base a eso reacomoda la data a travez de computed con orderBy en order by tomamos la info de las dos variable y dependiendo se reornena la data
*/
	
	
  var base = "../"
	require(['../js/config.js'],function(){
	require(['rx','vue','myheader','jquery','vueRx','vueFilter'],function(Rx,Vue,MyHeader,$,VueRx,vueFilter){
		if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
			Vue.use(VueRx, Rx, vueFilter);
			}
			Vue.use(vueFilter);
			//console.log(Vue.filter.reduce)


		Vue.component('keywordcounter',{
			template: '#keywordcounter-template',
			props:{
				data:Array,
				columns:Array
				
			},
			data: function(){
				var sortOrders = {};
				this.columns.forEach(function(key){
					sortOrders[key] = 1
				})
				return{
					sortKey:'',
					sortOrders: sortOrders
				}
			},
			methods:{
				sortBy: function(key){
					this.sortKey = key;
					this.sortOrders[key] = this.sortOrders[key]*-1;
					this.orderBy;
					
				}
			},
			computed:{
				orderBy :function(){
				//	console.log('hola', this.sortKey,this.sortOrders[this.sortKey], this.data[2].count)
					if(this.sortOrders[this.sortKey] == -1 && this.sortKey == "count"){
						this.data.sort(function(a,b){
							return (b.count - a.count)
						} );
					}else if(this.sortOrders[this.sortKey] == 1 && this.sortKey == "count"){
						this.data.sort(function(a,b){
							return (a.count -  b.count)
						} );
					}else if(this.sortOrders[this.sortKey] == -1 && this.sortKey == "term"){
					this.data.sort(function(a,b){
						var textA = a.term.toLowerCase();
						var textB = b.term.toLowerCase();
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
					})
					this.data.sort(function(a,b){
						return a.term.localeCompare(b.term);
					})
					
					}else if(this.sortOrders[this.sortKey] == 1 && this.sortKey == "term"){
						this.data.sort(function(a,b){
						var textA = a.term.toLowerCase();
						var textB = b.term.toLowerCase();
						return (textA < textB) ? -1 : (textA > textB)? 1 : 0;
					}).reverse();
					}
				}
			}
			
		})
		
		<?php 
	if(isset($_POST['haystack']) and isset($_POST['keyword'])) {
		$haystack = $_POST['haystack'];
		$keyword = $_POST['keyword'];
		
			$i = 1;
			$keywords = explode(',',$keyword)
		?>
		
			
			var action = new Vue({
				el:'#findkeywords',
				data:{
					searchQuery:'',
					keywordcounterColumns:['term','count'],
					keywordcounterData: [
					<?php 
					foreach($keywords as $keyword){
						if(!empty($keyword)){
							echo '{term:"'.trim($keyword).'", count:'.substr_count($haystack,trim($keyword)),'},';
						}
					}
					?>
					]
				}
				
			});
			
		
		<?php }?>
	})
	})
	
	</script>
</body>
</html>