<?php
 header("Access-Control-Allow-Origin: *");
  header('Content-Type: application/json');
  $val = $_GET['id'];
  $data =  file_get_contents("https://www.youtube.com/feeds/videos.xml?channel_id=" . $val);
  $xml = simplexml_load_string($data);
  $json = json_encode($xml);
  echo $json;
?>
