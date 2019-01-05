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
  echo "Record insert success";
}else{
  echo "Record failed to be inserted";
}





?>