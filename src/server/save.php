<?php

require "connection.php";

foreach ($_GET as $key => $value) {
  $data[$key] = $value;
}

$stmt = $con -> prepare("INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, 
`Description`, `Location`, `Status`,
`Company`, `SAP#`, `Request By`, 
`Request Date`, `Closed By`, `Completion Date`) 
VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

$i=1;
foreach ($data as $key => $value) {
  if($key == "SAP_Choice"){
    continue;
  }else {
    $stmt-> bindValue($i,$value);
    $i++;
  }
}
if($stmt->execute()){
  $stmt = $con -> prepare("SELECT `row`,`Work Title`,`Type 1`,`Type 2`,
  `Location`,`Status`,`Company`,`SAP#`,`Request By`,`Request Date`,`Closed By`,
  `Completion Date` FROM `main` WHERE 
  (`Work Title` LIKE ? AND `Type 1` LIKE ? AND `Type 2` LIKE ? 
  AND `Description` LIKE ? AND `Location` LIKE ? AND `Status` 
  LIKE ? AND `Company` LIKE ? AND `SAP#` LIKE ? AND `Request By` LIKE ?
  AND `Request Date` LIKE ? AND `Closed By` LIKE ? AND `Completion Date` 
  LIKE ? )");

  $i=1;
  foreach ($_GET as $key => $value) {
    if($key == "SAP_Choice"){
      continue;
    }else {
      $stmt-> bindValue($i,$value);
      $i++;
    }
  }
  $stmt -> execute();
  $row = $stmt ->fetch(PDO::FETCH_ASSOC);
  foreach ($row as $rowKey => $value) {
    $row[$rowKey] = nl2br($value);
  
  }
  $row["serverMessage"] = "Record insert success";
  
  echo json_encode($row);
  
}else{
  echo "Record failed to be inserted";
}





?>