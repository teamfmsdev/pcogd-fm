<?php
  require "connection.php";

foreach ($_GET as $key => $value) {
    $data[$key]=$value;
}

  // TO decide whether SAP is - or not

    switch($data["sapC"]){
        case "Yes":
            if($sapB==""){
                $sapQ="`SAP#` != '-'";
            }
            else{
                $sapQ="`SAP#` LIKE '%$sapB%'";
            }
            break;
        case "No":
        $sapQ="`SAP#` = '-'";
        break;
        default:$sapQ="`SAP#` LIKE '%'";
    }


    $stmt = $con -> prepare("SELECT * FROM `main` WHERE 
    (`Work Title` LIKE '%:wTitle%' AND `Type 1` LIKE '%:type1%' AND `Type 2` LIKE '%:type2' 
    AND `Description` LIKE '%:desc%' AND `Location` LIKE '%:loca%' AND `Status` 
    LIKE '%:stats%' AND `Company` LIKE '%:comp%' AND ? AND `Request By` LIKE '%?%'
    AND `Request Date` LIKE '%?%' AND `Closed By` LIKE '%?%' AND `Completion Date` 
    LIKE '%?%' )");

$stmt = mysqli_prepare($con,$sql);

mysqli_stmt_bind_param($stmt,"ssssssssssss",
$data["wTitle"],
$data["type1"],
$data["type2"],
$data["desc"],
$data["loca"],
$data["stats"],
$data["comp"],
$sapQ,
$data["reqB"],
$data["reqD"],
$data["clos"],
$data["compl"]);

if (mysqli_stmt_execute($stmt)){
    echo "Record Insert success";
  }else{
    echo "Fail";
  }
      
    
      while($row = mysqli_fetch_assoc($result)){
          // get $row key
          $arrKey = array_keys($row);
          // Loop Through $row using $arrKey as key
          foreach($arrKey as $key){
              // Put Line breaks where its due
              $row[$key]=nl2br($row[$key]);
          }        
          $jsonData[]=$row;        
      }

      echo json_encode($jsonData);
?>