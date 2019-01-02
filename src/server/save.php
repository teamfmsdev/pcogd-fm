<?php

require "connection.php";

foreach ($_GET as $key => $value) {
  $data[$key] = $value;
}


$stmt = $con -> prepare("INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, 
`Description`, `Location`, `Status`,
`Company`, `SAP#`, `Request By`, 
`Request Date`, `Closed By`, `Completion Date`) 
VALUES (:wTitle,:type1,:type2,:desc,:loca,:stats,:comp,:sapB,:reqB,:reqD,:clos,:comple)");

$i=1;
foreach ($data as $key => $value) {
  if($key == "sapC"){
    continue;
  }else {
    $stmt-> bindValue($key,$value);
    $i++;
  }
}


try{
  if($stmt->execute()){
    echo "Record insert success";
  }
  
}catch(PDOException $e){
  echo "Record insert fail <br>";
  echo $e->getmessage();
}



?>