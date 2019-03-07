<?php

require "connection.php";

foreach ($_GET as $key => $value) {
  $data[$key] = $value;
}

$stmt = $con -> prepare("SELECT * FROM `main` WHERE(`Work Title` = ? AND `Type 1`= ? AND `Type 2` = ? AND `Description`= ? AND`Location` = ? AND `Status` = ? AND `Company` = ? AND `SAP#` = ? AND `Request By` = ?)");

$i=1;
foreach ($data as $key => $value) {
  if($key == "Closed_By" || $key == "Completion_Date" || $key == "SAP_Choice" ){
    continue;
  }
  else{
   $stmt -> bindValue($i,$value) ;
   $i++;
  }
}

$stmt -> execute();

$row = $stmt -> fetchAll(PDO::FETCH_ASSOC);

foreach ($row as $rowKey => $value) {
  // Loop through each column as key eg "Work title",SAP#
  foreach ($row[$rowKey] as $colKey => $colVal) {
      // convert \n line break to <br> 
      $row[$rowKey][$colKey] = nl2br($colVal);
  }
  
}
// Send result as json
echo json_encode($row);




?>