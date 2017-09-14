define(['vue'],function(Vue){
var MyHeader = Vue.component('my-header', {
template: '<div><a href="">A custom component!</a> con un {{nombre}} </div>',
  data: function(){
	  return {
		  nombre:"hola"
	  }
  }
})
return MyHeader;
});