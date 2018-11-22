
<?php
$handler = opendir('CloudMusic');//当前目录中的文件夹下的文件夹
while( ($filename = readdir($handler)) !== false ) {
      if($filename != "." && $filename != ".."){
          echo $filename."|";
      }
}
closedir($handler);
?>
