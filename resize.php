<?php
  ini_set('memory_limit','512M');
  ini_set('max_execution_time', 0);
  require('bmp.php');

  $root = opendir('townmap');
  while (($dir = readdir($root)) !== false) {
    if($dir != '.' && $dir != '..') {
      $output_file = $dir.".png";

      if(!file_exists($output_file)) {
        $fp = fopen('townmap\\'.$dir.'\\'.$dir.'.tmi','r');

        fseek($fp,13);
        $grid_x = ord(fgetc($fp));
        fseek($fp,17);
        $grid_y = ord(fgetc($fp));

        $dh = opendir('townmap\\'.$dir);

        $im = imagecreatetruecolor($grid_x*64, $grid_y*64);
        while (($file = readdir($dh)) !== false) {
            if(substr($file,-4) == '.bmp') {
              $num = intval(substr($file,-10,-4));
              $y = floor($num / $grid_x);
              $x = $num - $y*$grid_x;
              $tile = imagecreatefrombmp('townmap\\'.$dir.'\\'.$file);
              imagecopy($im, $tile, $x*64, $y*32, 0, 0, 64, 32);
              imagedestroy($tile);
            }
        }
        imagepng($im, $output_file);
      }

      if(!file_exists($dir.'.html')) {
        mkdir($dir);

        $out=array();
        $err = 0;
        $cmd = '"C:\\Program Files\\ImageMagick-6.7.6-Q16\\convert.exe"';
        $str = $cmd.' -trim "'.$output_file.'" "'.$output_file.'"';
        $run = shell_exec($str);

        $info = getimagesize($output_file);

        $w = $info[0];
        $h = $info[1];

        $dst_w = ceil($w/2048)*2048;
        $dst_h = ceil($h/2048)*2048;

        //echo ($dst_w*2048)."x".($dst_h*2048);

        $im = imagecreatetruecolor($dst_w, $dst_h);
        $src = imagecreatefrompng($output_file);

        $x = ($dst_w - $w)/2;
        $y = ($dst_h - $h)/2;

        imagecopy($im, $src, $x, $y, 0, 0, $w, $h);
        imagepng($im, $output_file);
        imagedestroy($im);
        imagedestroy($src);

        mkdir($dir.'\\5');
        $str = $cmd.' -crop 256x256 "'.$output_file.'" "'.$dir.'\\5\\tile.jpg"';
        $run = shell_exec($str);

        mkdir($dir.'\\4');
        $str = $cmd.' -resize 50% -crop 256x256 "'.$output_file.'" "'.$dir.'\\4\\tile.jpg"';
        $run = shell_exec($str);

        mkdir($dir.'\\3');
        $str = $cmd.' -resize 25% -crop 256x256 "'.$output_file.'" "'.$dir.'\\3\\tile.jpg"';
        $run = shell_exec($str);

        mkdir($dir.'\\6');
        $str = $cmd.' -resize 200% -crop 256x256 "'.$output_file.'" "'.$dir.'\\6\\tile.jpg"';
        $run = shell_exec($str);

        $offsetX = $dst_w/256;
        $offsetY = $dst_h/256;

        $html = file_get_contents("index.html");
        $html = str_replace('@offsetX',$offsetX,$html);
        $html = str_replace('@offsetY',$offsetY,$html);
        $html = str_replace('@folder',$dir,$html);
        file_put_contents($dir.'.html', $html);
      }
    }
  }

?>
