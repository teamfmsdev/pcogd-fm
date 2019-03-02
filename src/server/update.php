<?php

require "connection.php";

foreach ($_GET as $key => $value) {
    $data[$key] = $value;
  }
  

$stmt = $con -> prepare("UPDATE `main` SET `Work Title`=?,`Priority`=?,`Type 1`=?,`Type 2`=?,`Description`=?,`Location`=?,`Status`=?,`Company`=?,
`SAP#`=?,`Request By`=?,`Request Date`=?,`Closed By`=?,
`Completion Date`=? WHERE row=?");

$i=1;
foreach ($data as $key => $value) {
    if($key == "SAP_Choice"){
      continue;
    }else {
      $stmt-> bindValue($i,$value);
      $i++;
    }
  }
if($stmt -> execute()){
    echo "Update sucess";
}else{
    echo "Update failed";
}
