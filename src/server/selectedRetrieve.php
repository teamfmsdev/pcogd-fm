<?php

require "connection.php";

// Retrive data base on ID from $_GET
$stmt =$con->prepare("SELECT * FROM `main` WHERE(`row`=?)") ;

$stmt -> bindValue(1,$_GET["dataId"]);

$stmt ->execute();

$row=$stmt->fetch(PDO::FETCH_ASSOC);

foreach ($row as $key => $value) {
    $row[$key] = nl2br($value);
}

echo json_encode($row);

// while ($row=mysqli_fetch_assoc($result)) {
//     //Assign line break where its due
//     // foreach ($row as $rowKey => $value) {
//     //   $row[$rowKey] = nl2br($row[$rowKey]);
//     // }
//     $jsonData =$row;
// }
// echo json_encode($jsonData);
