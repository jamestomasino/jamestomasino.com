<?php
$r = $_REQUEST['u'];
header('Content-type: application/json');
$body = file_get_contents($r, False);
print $body;
?>
