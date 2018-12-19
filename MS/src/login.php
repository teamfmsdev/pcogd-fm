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
    setcookie("Name",$row["Name"],0,"/");
    setcookie("Dept",$row["Department"],0,"/");
    setcookie("Email",$row["Email"],0,"/");
    setcookie("Username",$row["Username"],0,"/");
    $jsonData[]=$row;
  }
  
echo json_encode($jsonData);
}
?>