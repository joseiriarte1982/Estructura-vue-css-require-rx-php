
# Vue plugin that allows you to bundle relevant CSS with your components

## Rationale

Vue components should be stand-alone units with everything relevant embedded inside.

Unfortunately, Vue doesn't support embedded styles. You can use Webpack or Browserify, but if you don't want to, then there is no suitable solution.

This plugin inserts itself on top of Vue.component() and if there is a "style" member present in component's definition, it adds it to the page.

CSS selectors are prefixed with the name of the component, for example:

```js
Vue.component('my-component',
{
	template: '<div class="my-component"><span>Hello</span>, <p class="this-too">world!</p></div>',

	style:    'span, .this-too{ font-color: red }'+
			  '@font-face {font-family: "et-line";src:url("../fonts/et-line.eot");}'+
			  '@media (min-width: 767px) {.test{width:100px;height:100px;background:gray;}}'+
			  '@media (max-width: 767px) {.test{width:100px;height:100px;background:blue;}}'
});
```
Accept font face and media but only one selector at a time
will add ```.my-component span, .my-component .this-too{ font-color: red }``` to the page.

This means that the root element of your component must have the same class as its name.

## Usage

Simply add 'vue-css.js' file to your page.

If you want to override component styles, add ```<style type="text/css" id="vue-styles"></style>``` to the page header.

The plugin will put all the component styles there and you can then add styles above or below to either inherit or override them.

NOTE: (Not anymore) xxxx Selectors inside nested at-rules, like @media, are not processed, so you need to prefix them with your root class manually.
