require(['rx','vue','myheader','jquery','vueRx'],function(Rx,Vue,MyHeader,$,VueRx){
if (typeof Vue !== 'undefined' && typeof Rx !== 'undefined') {
  Vue.use(VueRx, Rx);
  
}
new Vue({
	el: '#app-4',
	data: {
		nombre:"nombre",
		title:"todos",
		todos: [
			{ text: '<a href="#">Learn JavaScript</a>', done:true },
			{ text: 'Learn Vue', done:true },
			{ text: 'Build something awesome', done:false }
		]
	}
})

new Vue({
	el:"#miInstancia",
	data:{
		librerias:["jquery","vue","vanilla","mootools","angular"],
		nuevalibreria:""
	},
	methods:{
		addLibrary: function(){
			if(this.nuevalibreria == "")
				return;
			this.librerias.push(this.nuevalibreria);
			this.nuevalibreria = "";
		},
		deleteLibrary: function(){
			this.librerias = [];
		}
	}
})



Vue.component('my-component', {
  template: '<button v-on:click="more">Iwant more!</button>',
  methods:{
    more:function(){
	//	console.log(this)
      this.$emit('more',100)
    }
  }
})

new Vue({
  el: '#app',

  // declare dom stream Subjects
  domStreams: ['plus$', 'minus$','more$'],

  subscriptions () {
    var plus$ = this.plus$.map(() => 1)
    var minus$ = this.minus$.map(() => -1)
    var more$ = this.more$.map(() => 100)
    var count$ = Rx.Observable
      .merge(plus$, minus$, more$)
      .startWith(0)
      .scan((total, change) => total + change)

    return {
      count: count$
    }
  }
})



/*new Vue({
  el: "#wrap",
  data: {
    modal: null,
  },
  methods: {
    showModal: function(){
      $(this.$el).append('<div class="modalContainer"></div>'); 
       this.modal = new MyModal({
			data: {
				content: 'hello',
				done:false
			}
		});
		console.log(this.modal)
		this.modal.$mount(this.$el.querySelector('.modalContainer'))   
/*console.log(this.modal.$mount(this.$el.querySelector('.modalContainer')))		
	console.log(this.modal.$mount($(this.$el).find('.modalContainer').get().pop()));    
	console.log(this.modal.$mount($(this.$el).find('.modalContainer')[0]));*
	console.log(this.modal)
    },
    hideModal: function() {
		this.modal._isVue = false;
		console.log(this.modal)
		
     this.modal.$destroy(true);
    }
  }
});*/
		
});

/*this.modal.$mount(this.$el.querySelector('.modalContainer'))

var Modal = Vue.extend({
  template: '<div class="modal">{{content}}</div>',
  data: function(){
    return {content: ''};
  }
});


new Vue({
  el: "#wrap",
  data: {
    name: "hal",
    modal: null,
  },
  methods: {
    showModal: function(){
      $(this.$el).append('<div class="modalContainer"></div>');
        
       this.modal = new Modal({
    data: {
      content: 'hello'
    }
  });
  this.modal.$mount(this.$el.querySelector('.modalContainer'))    
  //this.modal.$mount($(this.$el).find('.modalContainer').get().pop());    
 //this.modal.$mount($(this.$el).find('.modalContainer')[0]);
    },
    hideModal: function() {
     this.modal.$destroy(true);
    }
  }
});*/


/*
// register
Vue.component('my-component', {
template: '<div><a href="">A custom component!</a> con un {{nombre}} </div>',
  data: function(){
	  return {
		  nombre:"hola"
	  }
  }
})
// create a root instance
/*new Vue({
  el: '#example'
})

new Vue({
  el: '#app-4',
  data: {
	nombre:"nombre",
	title:"todos",
    todos: [
      { text: '<a href="#">Learn JavaScript</a>', done:true },
      { text: 'Learn Vue', done:true },
      { text: 'Build something awesome', done:false }
    ]
  }
})*/