require(['rx','vue','myheader','jquery','vueRx','vueFilter'],function(Rx,Vue,MyHeader,$,VueRx,vueFilter){
if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
  Vue.use(VueRx, Rx, vueFilter);
  
}
 Vue.use(vueFilter);
//console.log(Vue.filter.reduce)



var MyHeader = Vue.component('login-form', {
template: '<div><a href="">A custom component!</a> con un {{nombre}} </div>',
  data: function(){
	  return {
		  nombre:"hola"
	  }
  }
})
const app = new Vue({
	el:'#app',
	data:{
		user:{name:null,password:null,checked:true},
		urlPasswordChange:'http://localhost/vue/forgot',
		errors:[]
	},
	computed:{
		isFormEmpty: function()
		{
			return !(this.user.name && this.user.password);
		},
		isChecked: function(){
			return (this.user.checked) ? 'checked':'';
		}
	},
	methods:{
		onLogin: function(){
			this.errors= [];
			if(this.user.name.length < 6){
				console.log('El nombre de usuario debe tener al menos 6 caracteres')
				this.errors.push('El nombre de usuario debe tener al menos 6 caracteres');
			}
			if(this.user.password.length < 6){
				this.errors.push('La contraseña debe tener al menos 6 caracteres');
			}
		},
		checkChecked: function(){
			if(this.user.checked){
				console.log('Si checked')
			}else{
				console.log('No checked')
			}
		}
	}
	
})
console.log(app)
/*var ajax = ajaxObj("POST", "<?php echo $extdir; ?>php_parsers/login_exec.php");
        ajax.onreadystatechange = function() {
       if(ajaxReturn(ajax) == true) {
////////////////

//const messageObservable = Rx.Observable.fromEvent(document, 'click')

var messageObservable = Rx.Observable.fromEvent(document, 'click')
.filter(function(c) { return c.clientX > window.innerWidth / 2; })
.take(10).map(function(c){return c.clientX+', '+ c.clientY})
//.subscribe(function(c) { return c.clientX+', '+ c.clientY})
var count = Rx.Observable.interval(1000).take(5)
var vm = new Vue({
	el:'#vuerx',
	data:{
		msg:''
	},
	subscriptions:{
		msg : messageObservable
		} 
	
	/*,
	mounted (){
		this.$subscribeTo(messageObservable , function(c){console.log(c.clientX+', '+c.clientY)})
		this.$subscribeTo(count,function(count){console.log(count)})
	}/
})


///////////////
*/
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
})
	/*,
	mounted (){
		this.$subscribeTo(messageObservable , function(c){console.log(c.clientX+', '+c.clientY)})
		this.$subscribeTo(count,function(count){console.log(count)})
	}/
})
*/
})