<?php

$id=$_POST['id'];
$pw=$_POST['pw'];

$pw = hash("sha256",$pw);

$con = mysqli_connect("localhost","root","","test");

$query = "SELECT * from `users` WHERE (`Username` = '$id' AND `Password` = '$pw')";

$result=mysqli_query($con,$query);

$jsonData=array();


if (mysqli_num_rows($result) == 1){
  while($row = mysqli_fetch_array($result)){
    unset($row["4"]);
    unset($row["Password"]);
    $jsonData[]=$row;
  }
echo json_encode($jsonData);
}
?>