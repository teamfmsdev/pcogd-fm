<?php

require "connection.php";

foreach ($_GET as $key => $value) {
    $data[$key] = $value;
}

$sql ="INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, 
  `Description`, `Location`, `Status`,
  `Company`, `SAP#`, `Request By`, 
  `Request Date`, `Closed By`, `Completion Date`)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

$stmt=mysqli_prepare($con, $sql);


mysqli_stmt_bind_param(
    $stmt,
    "ssssssssssss",
$data["wTitle"],
$data["type1"],
$data["type2"],
$data["desc"],
$data["loca"],
$data["stats"],
$data["comp"],
$data["sapB"],
$data["reqB"],
$data["reqD"],
$data["clos"],
$data["comple"]
);

if (mysqli_stmt_execute($stmt)) {
    echo "Record Insert success";
} else {
    echo "Fail";
}

// foreach ($data as $key => $value) {
  // mysqli_stmt_bind_param($stmt,"s",$data["Work Title"]);
// }

// echo "hehe";
