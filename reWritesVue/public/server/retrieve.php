<?php
  require "connection.php";
  require "misc.php";

    // Loop through GET variables and append wildcard 
    foreach ($_GET as $key => $value) {
    // Skip SAP# and SAP_Choice
    if ($key == "SAP#" || $key == "SAP_Choice"){
        $data[$key] = $value;
    }else{   
        $data[$key] = "%".$value."%";
    }
}

  /* To decide what kind of SAP behaviour to search
    e.g. no SAP# , only with SAP# or to retrieve both with and without */
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
    (`Work Title` LIKE ? AND `Priority` LIKE ? AND `Type 1` LIKE ? AND `Type 2` LIKE ? 
    AND `Description` LIKE ? AND `Location` LIKE ? AND `Status` 
    LIKE ? AND `Company` LIKE ? AND `SAP#` $data[SAP_Choice] ? AND `Request By` LIKE ?
    AND `Request Date` LIKE ? AND `Closed By` LIKE ? AND `Completion Date` 
    LIKE ? )");

    // Bind value to be send to DB
    $i=1;
    foreach ($data as $key => $value) {
    // Skip SAP_Choice
    if($key == "SAP_Choice"){
        // $stmt-> bindValue($i,$value);
        continue;
    }else {
        $stmt-> bindValue($i,$value);
        $i++;
    }
    }

    $stmt->execute();
    // Set fetching type to associative array
    $row = $stmt ->fetchAll(PDO::FETCH_ASSOC);
    // Loop throgh array of results eg 1,2,3,4,5
    $jsonData;
    foreach ($row as $rowKey => $value) {
        // Loop through each column as key eg "Work title",SAP#
        foreach ($row[$rowKey] as $colKey => $colVal) {
            // convert \n line break to <br> 
            switch($colKey){
                case "row":
                $jsonData[$rowKey]["fmNo"] = $colVal;
                break;
                case "Work Title":
                $jsonData[$rowKey]["wTitle"] = $colVal;
                break;
                case "Priority":
                $jsonData[$rowKey]["prio"] = $colVal;
                break;
                case "Type 1":
                $jsonData[$rowKey]["t1"] = $colVal;
                break;
                case "Type 2":
                $jsonData[$rowKey]["t2"] = $colVal;
                break;
                case "Description":
                $jsonData[$rowKey]["desc"] = $colVal;
                break;
                case "Location":
                $jsonData[$rowKey]["loca"] = $colVal;
                break;
                case "Status":
                $jsonData[$rowKey]["stat"] = $colVal;
                break;
                case "Company":
                $jsonData[$rowKey]["comp"] = $colVal;
                break;
                case "SAP#":
                $jsonData[$rowKey]["sapN"] = $colVal;
                break;
                case "Request By":
                $jsonData[$rowKey]["reqBy"] = $colVal;
                break;
                case "Request Date":
                $jsonData[$rowKey]["reqD"] = $colVal;
                break;
                case "Closed By":
                $jsonData[$rowKey]["closBy"] = $colVal;
                break;
                case "Completion Date":
                $jsonData[$rowKey]["closD"] = $colVal;
                break;
                default:
            }
            // $jsonData[$rowKey][$colKey] = nl2br($colVal);
        }
        
    }
    // Send result as json
    echo json_encode($jsonData);

// try{


    
//   }catch(PDOException $e){
//     echo "Record retrieve fail <br>";
//     echo $e->getmessage() . "<br>";
   
//     echo '<pre>'.htmlspecialchars(pdo_debugStrParams($stmt)).'</pre>';
//   }
      
    

?>