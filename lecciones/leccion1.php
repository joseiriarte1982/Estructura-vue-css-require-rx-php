<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>App</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/main.css">
  <script src="../js/require.js"></script>

	<style>
	.green{
		color:green;
	}
	</style>
</head>
<body>
<div id="app">
 

</div>
  <script>
	var base = "../";
	require(['../js/config.js'],function(){
		require(['myleccion1']);
	})
	</script>	
</body>
</html>