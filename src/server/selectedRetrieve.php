<?php

require "connection.php";

// Assign $_GET data as an escaped assosiacte array
foreach ($_GET as $key => $value) {
    $queryKey[$key] = mysqli_real_escape_string($con, $value);
}

// Retrive data base on ID from $_GET
$sql= "SELECT * FROM `main` WHERE(`row`='$queryKey[$key]')";

$result = mysqli_query($con, $sql);



while ($row=mysqli_fetch_assoc($result)) {
    //Assign line break where its due
    // foreach ($row as $rowKey => $value) {
    //   $row[$rowKey] = nl2br($row[$rowKey]);
    // }
    $jsonData =$row;
}
echo json_encode($jsonData);
