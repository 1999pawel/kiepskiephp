<?php
	require_once "connect.php";
	$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);

	if ($polaczenie->connect_errno!=0)
	{
		echo "Error: ".$polaczenie->connect_errno;
	}
	else
	{   
        $score = $_POST['score'];
        $level = $_POST['level'];

        $zmiana = "UPDATE kiepskie_rekordy SET $level = '$score'";
		@$polaczenie->query($zmiana);

		header('location: index.php');

		$polaczenie->close();
	}
?>