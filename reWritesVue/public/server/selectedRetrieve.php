<?php

require "connection.php";

// Retrive data base on ID from $_GET
$stmt =$con->prepare("SELECT `row` as fmNo,`Work Title` as wTitle,
 `Priority` as prio,`Type 1` as t1,`Type 2` as t2,`Description` as 'desc',
 `Location` as loca,`Status` as stat,`Company` as comp,`SAP#` as sapN,
 `Request By` as reqBy,`Request Date` as reqD,`Closed By` as closBy,
 `Completion Date` as closD FROM `main` WHERE(`row`=?)") ;

$stmt -> bindValue(1,$_GET["dataId"]);

$stmt ->execute();

$row=$stmt->fetch(PDO::FETCH_ASSOC);

// foreach ($row as $key => $value) {
//     $row[$key] = nl2br($value);
// }

echo json_encode($row);

