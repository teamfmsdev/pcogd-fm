<?php
  require "connection.php";
  require "misc.php";

  // Loop through GET variables and append wildcard 
foreach ($_GET as $key => $value) {

    if ($key == "SAP#" || $key == "SAP_Choice"){
        $data[$key] = $value;
    }else{
        
        $data[$key] = "%".$value."%";
    }
    // $data[$key]= ($key!="SAP#" || $key!="SAP_Choice") ? "%".$value."%": $value;
}

  // TO decide whether SAP is - or not
    switch($data["SAP_Choice"]){
        case "Yes":
            if($data["SAP#"]==""){
                $data["SAP_Choice"] = "!=";
                $data["SAP#"]="-";
            }
            else{
                $data["SAP_Choice"] = "LIKE ";
                $data["SAP#"]="%".$data["SAP#"]."%";
            }
            break;
        case "No":
        $data["SAP_Choice"] = "=";
        $data["SAP#"]="-";
        break;
        default:
        $data["SAP_Choice"] = "LIKE";
        $data["SAP#"]="%";
    }


    $stmt = $con -> prepare("SELECT * FROM `main` WHERE 
    (`Work Title` LIKE ? AND `Type 1` LIKE ? AND `Type 2` LIKE ? 
    AND `Description` LIKE ? AND `Location` LIKE ? AND `Status` 
    LIKE ? AND `Company` LIKE ? AND `SAP#` $data[SAP_Choice] ? AND `Request By` LIKE ?
    AND `Request Date` LIKE ? AND `Closed By` LIKE ? AND `Completion Date` 
    LIKE ? )");

$i=1;
foreach ($data as $key => $value) {
  if($key == "SAP_Choice"){
    // $stmt-> bindValue($i,$value);
    continue;
  }else {
    $stmt-> bindValue($i,$value);
    $i++;
  }
}

try{
    $stmt->execute();

    $row = $stmt ->fetchAll(PDO::FETCH_ASSOC);
    foreach ($row as $rowKey => $value) {
        foreach ($row[$rowKey] as $colKey => $colVal) {
            $row[$rowKey][$colKey] = nl2br($colVal);
        }
        
    }
     echo json_encode($row);

    
  }catch(PDOException $e){
    echo "Record retrieve fail <br>";
    echo $e->getmessage() . "<br>";
   
    echo '<pre>'.htmlspecialchars(pdo_debugStrParams($stmt)).'</pre>';
  }
      
    

?>