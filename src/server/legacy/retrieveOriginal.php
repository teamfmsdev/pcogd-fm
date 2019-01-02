<?php
  require "connection.php";

  foreach ($_GET as $key => $value) {
    $data[$key] = $value;
}

  // #warning
  // #spaghettiCodesAhead

  // TO decide whether SAP is - or not

    switch ($sapC) {
        case "Yes":
            if ($sapB=="") {
                $sapQ="`SAP#` != '-'";
            } else {
                $sapQ="`SAP#` LIKE '%$sapB%'";
            }
            break;
        case "No":
        $sapQ="`SAP#` = '-'";
        break;
        default:$sapQ="`SAP#` LIKE '%'";
    }


$sql= "SELECT * FROM `main` WHERE (`Work Title` LIKE '%$wTitle%' AND `Type 1` LIKE '%$type1%' AND `Type 2` LIKE '%$type2' AND `Description` LIKE '%$desc%'
AND `Location` LIKE '%$loca%' AND `Status` LIKE '%$stats%' AND `Company` LIKE '%$comp%' AND $sapQ AND `Request By` LIKE '%$reqB%'
AND `Request Date` LIKE '%$reqD%' AND `Closed By` LIKE '%$clos%' AND `Completion Date` LIKE '%$compl%' )";


  $result=mysqli_query($con, $sql);
      
    
      while ($row = mysqli_fetch_assoc($result)) {
          // get $row key
          $arrKey = array_keys($row);
          // Loop Through $row using $arrKey as key
          foreach ($arrKey as $key) {
              // Put Line breaks where its due
              $row[$key]=nl2br($row[$key]);
          }
          $jsonData[]=$row;
      }

      echo json_encode($jsonData);
