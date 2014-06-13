<?php
	header('HTTP/1.1 200 OK');
	$r = $_REQUEST['u'];
	$backupfile = "./linkedinbackup.txt";

	$ch = curl_init($r);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	if ( ( $body = curl_exec($ch) ) === false ) {
		# If we get the latest from the web, store it as a backup file
		$body = preg_replace("/<img[^>]+\>/i", "(image) ", $body);
		file_put_contents($file, $body);
	} else {
		# If we can't get the latest from the web, use the backup file
		$body = file_get_contents('./linkedinbackup.txt', true);
	}
	print $body;
?>
