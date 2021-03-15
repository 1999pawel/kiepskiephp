<!DOCTORTYPE HTML>
	<html lang="pl">

	<head>
		<meta charset="utf-8" />
		<title>Tytuł</title>
		<meta name="description" content="Opis strony" />
		<meta name="keywords" content="Tagi">
		<meta http-equiv="\x-UA Compatible" content="IE=edge,chrome=1" />
		<link rel="stylesheet" type="text/css" href="style.css">
		<!--[if lt IE 9]>
		<script src="bower_components/html5shiv/dist/html5shiv.js"></script>
		<![endif]-->
	</head>


	<body>

		<?php
			require_once "connect.php";
			$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
		
			if ($polaczenie->connect_errno!=0)
			{
				echo "Error: ".$polaczenie->connect_errno;
			}
			else
			{
				$sql = "SELECT * FROM kiepskie_rekordy";
				$rezultat = @$polaczenie->query($sql);
				$lvl = $rezultat->fetch_assoc();
		
				$latwy = $lvl['latwy'];
				$sredni = $lvl['sredni'];
				$trudny = $lvl['trudny'];
		
				$polaczenie->close();
				
			}
			echo '<p id="bs_latwy" style="visibility: hidden;position: absolute">'.$latwy.'</p>';
			echo '<p id="bs_sredni" style="visibility: hidden;position: absolute">'.$sredni.'</p>';
			echo '<p id="bs_trudny" style="visibility: hidden;position: absolute">'.$trudny.'</p>';
		?>
		

		<header>
			<h1 onClick="window.location.reload();">Pamięciówka</h1>
		</header>

		<div id="wybor">

			<h3>Wybierz poziom trudności</h3>
			<p id="p1">dwunóg</p>
			<p id="p2">magister</p>
			<p id="p3">gieniusz</p>
		</div>
		<article>
			<div class="board"></div>
		</article>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
		<script src="memory.js"> </script>
	</body>

	</html>