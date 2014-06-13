<?php
header('HTTP/1.1 200 OK');
$r = $_REQUEST['u'];
#header('Content-type: application/json');
$body = file_get_contents($r, False);
$body = preg_replace("/<img[^>]+\>/i", "(image) ", $body);
print $body;
?>
