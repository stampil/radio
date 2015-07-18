<?php
header('Content-Type: text/html; charset=utf-8');
function dirToArray($dir) {

    $result = array();

    $cdir = scandir($dir);
    foreach ($cdir as $key => $value)
    {
        if (!in_array($value,array(".","..")))
        {
            if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
            {
                $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
            }
            else
            {
                if(preg_match('/\.mp3$/',$value)) $result[] = $value;
            }
        }
    }

    return $result;
}

$mp3s = dirToArray('./mp3');
$random_mp3 = array();
foreach($mp3s as $type =>$tab){
    foreach($tab as $mp3){
        $mp3 = str_replace("'","\'",$mp3);
        array_push($random_mp3, "'./mp3/$type/$mp3',");
    }
}
shuffle($random_mp3);
  $string_mp3 =   implode(PHP_EOL,$random_mp3);
?><!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
        <meta charset="utf-8" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script>if (typeof jQuery === 'undefined') {
                document.write(unescape('%3Cscript%20src%3D%22/js/jquery-2.1.4.min.js%22%3E%3C/script%3E'));
            }
        </script>
    </head>
    <body>
        <audio src="mp3/The Submarines - Shoelaces.mp3" id="audio1">
            Votre navigateur ne supporte pas l'élément <code>audio</code>.
        </audio>
        <audio src="mp3/.mp3" id="audio2"  preload="auto">
            Votre navigateur ne supporte pas l'élément <code>audio</code>.
        </audio>
       <img src="img/bg.png" style="  position: fixed;
  bottom: 0;
  left: 500px;" />
        <script>

                var mp3s = new Array(
                    <?php
                    echo $string_mp3.PHP_EOL;
?>
'./mp3/speech/radio star pirates.mp3'
                        );
                var inc_music = Math.floor(Math.random() * mp3s.length);
                var random_duration = Math.floor(Math.random() * 50 + 50);

        </script>
        <script src="js/player.js"></script>
        <script src="js/radio.js"></script>
    </body>
</html>