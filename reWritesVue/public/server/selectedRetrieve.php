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

