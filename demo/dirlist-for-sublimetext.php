<?php
if ($handle = opendir('.')) {
  /* ディレクトリをループする際の正しい方法です */
  $path = getcwd();
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != "..") {
      echo "$path$entry,";
    }
  }
  closedir($handle);
}