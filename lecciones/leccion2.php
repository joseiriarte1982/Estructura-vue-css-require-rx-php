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
<div id="app" class="container" v-cloak>
<div style="margin:50px auto;">
	<h1>Bienvenido {{ user.name }}</h1>
	<div class="login-errors-container" v-if="errors.length !== 0">
		<ul class="login-errors">
			<li v-for="error in errors">{{error}}</li>
		</ul>
	</div>
	
	<form  class="login loginform" v-on:submit.prevent="onLogin">
		<div class="login-field ">
			<label for="username">Nombre de usuario</label>
			<input type="text" id="username" class="username full-width form-control has-padding has-border" v-model="user.name">
		</div>
		<div class="login-field">
			<label for="password">Contraseña</label>
			<input type="text" id="password" class="password full-width form-control has-padding has-border" v-model="user.password">
		</div>
		<div class="login-field">
			<div id="remember">
				<input type="checkbox" name="remember-me" id="remember-me-login" class="checkbox" v-model="user.checked"> 
					<span>Mantenme dentro</span>
			</div>
			<button type="submit" id="loginbtn" class="btn btn-default" v-bind:disabled="isFormEmpty">Entrar</button>
		</div>
	</form>
		<a v-bind:href="urlPasswordChange" class="forgotpasswordlink" target="_blank">Has olvidado tu contraseña</a>
</div>
<button v-on:click="checkChecked">Check</button>
</div>	
<div id="vuerx">
<div><h2>{{count}}</h2></div>
<button v-stream:click="add$">Add</button>
</div>
 <script>

	
	
  var base = "../"
	require(['../js/config.js'],function(){
	require(['myleccion2']);
	})
	</script>
</body>
</html>