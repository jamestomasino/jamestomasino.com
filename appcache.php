<?php
    header('Content-type: text/cache-manifest');
    $dir = '.';
    $datestamp = 0;
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $fileinfo) {
        $datestamp = max ($datestamp, $fileinfo->getMTime() );
    }
    $datestamp = "# " . $datestamp . "\n";
?>
CACHE MANIFEST
<?=$datestamp;?>

CACHE:
index.html
css/main.css
images/checker.png
js/jquery-1.8.2.min.js
js/modernizr.min.js
js/AppCacheMediator.class.js
js/scripts.js

NETWORK:
*

FALLBACK:
images/ images/offline.gif

