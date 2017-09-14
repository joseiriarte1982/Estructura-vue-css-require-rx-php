define(['vue'],function(Vue){
var MyHeader = Vue.component('my-header', {
props:['nombre'],
template: '<div><a href="">A custom component!</a> con un {{nombre}}, {{name}} </div>',
  data: function(){
	  return {
		  name:'hola' 
	  }
  }
})
return MyHeader;
});