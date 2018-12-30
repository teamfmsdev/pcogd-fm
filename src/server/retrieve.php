<?php
  require "connection.php";
  $wTitle =mysqli_real_escape_string($con,$_GET['wTitle']);
  $type1 = mysqli_real_escape_string($con,$_GET['type1']);
  $type2 = mysqli_real_escape_string($con,$_GET['type2']);
  $desc = mysqli_real_escape_string($con,$_GET['desc']);
  $loca = mysqli_real_escape_string($con,$_GET['loca']);
  $comp = mysqli_real_escape_string($con,$_GET['comp']);
  $stats = mysqli_real_escape_string($con,$_GET['stats']);
  $sapB = mysqli_real_escape_string($con,$_GET['sapB']);

  $sapC = mysqli_real_escape_string($con,$_GET['sapC']);

  $reqB = mysqli_real_escape_string($con,$_GET['reqB']);
  $reqD = mysqli_real_escape_string($con,$_GET['reqD']);
  $clos = mysqli_real_escape_string($con,$_GET['clos']);
  $compl = mysqli_real_escape_string($con,$_GET['comple']);

//   $callArg = mysqli_real_escape_string($con,$_GET['callArg']);

  // #warning
  // #spaghettiCodesAhead

  // TO decide whether SAP is - or not
  if($sapC == "No"){
      $sql= "SELECT * FROM `main` WHERE (`Work Title` LIKE '%$wTitle%' AND `Type 1` LIKE '%$type1%' AND `Type 2` LIKE '%$type2' AND `Description` LIKE '%$desc%'
      AND `Location` LIKE '%$loca%' AND `Status` LIKE '%$stats%' AND `Company` LIKE '%$comp%' AND `SAP#` = '-' AND `Request By` LIKE '%$reqB%'
      AND `Request Date` LIKE '%$reqD%' AND `Closed By` LIKE '%$clos%' AND `Completion Date` LIKE '%$compl%' )";
  }else if($sapC == "Yes"){
      if($sapB == ""){
          $sql= "SELECT * FROM `main` WHERE (`Work Title` LIKE '%$wTitle%' AND `Type 1` LIKE '%$type1%' AND `Type 2` LIKE '%$type2' AND `Description` LIKE '%$desc%'
          AND `Location` LIKE '%$loca%' AND `Status` LIKE '%$stats%' AND `Company` LIKE '%$comp%' AND `SAP#` != '-' AND `Request By` LIKE '%$reqB%'
          AND `Request Date` LIKE '%$reqD%' AND `Closed By` LIKE '%$clos%' AND `Completion Date` LIKE '%$compl%' )";
      }else if($sapB != ""){
          $sql= "SELECT * FROM `main` WHERE (`Work Title` LIKE '%$wTitle%' AND `Type 1` LIKE '%$type1%' AND `Type 2` LIKE '%$type2' AND `Description` LIKE '%$desc%'
          AND `Location` LIKE '%$loca%' AND `Status` LIKE '%$stats%' AND `Company` LIKE '%$comp%' AND `SAP#` LIKE '%$sapB%' AND `Request By` LIKE '%$reqB%'
          AND `Request Date` LIKE '%$reqD%' AND `Closed By` LIKE '%$clos%' AND `Completion Date` LIKE '%$compl%' )";
      }
      
  }else if($sapC == ""){
      $sql= "SELECT * FROM `main` WHERE (`Work Title` LIKE '%$wTitle%' AND `Type 1` LIKE '%$type1%' AND `Type 2` LIKE '%$type2' AND `Description` LIKE '%$desc%'
      AND `Location` LIKE '%$loca%' AND `Status` LIKE '%$stats%' AND `Company` LIKE '%$comp%' AND `Request By` LIKE '%$reqB%'
      AND `Request Date` LIKE '%$reqD%' AND `Closed By` LIKE '%$clos%' AND `Completion Date` LIKE '%$compl%' )";
  }


  // $sql="SELECT * FROM `main` WHERE (`Work Title` Like '%$wTitle%' AND `Type 1` Like '%$type1%' AND `Type 2` Like '%$type2%' AND 
  // `Description` Like '%$desc%' AND `Location` Like '%$loca%' AND `Company` Like '%$comp%' And `%SAP#%` Like '%$sapB%') ";



  // CHANGE SQL TO REFLECT WHAT USER INPUT RATHER THAN RETRIEVE ALL

  $result=mysqli_query($con,$sql);    
      
    
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