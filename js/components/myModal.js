define(['vue'],function(Vue){
var MyModal = Vue.extend({
  template: '<div :class="this.done ? \'done\' : \' \' " v-on:click="done = !done">{{content}}</div>',
  data: function(){
    return {
		content: '',
		done: false
	}
	}
});
return MyModal;
});