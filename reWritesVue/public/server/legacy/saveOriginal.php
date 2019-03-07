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
    $reqB = mysqli_real_escape_string($con,$_GET['reqB']);
    $reqD = mysqli_real_escape_string($con,$_GET['reqD']);
    $clos = mysqli_real_escape_string($con,$_GET['clos']);
    $compl = mysqli_real_escape_string($con,$_GET['comple']);
    
    
    
    
        $sql ="INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, `Description`, `Location`, `Status`,
     `Company`, `SAP#`, `Request By`, `Request Date`, `Closed By`, `Completion Date`)
     VALUES ('$wTitle','$type1','$type2','$desc','$loca','$stats','$comp','$sapB','$reqB',
     '$reqD','$clos','$compl')";

    // $sql = mysqli_prepare($con,$sql);

    if (mysqli_query($con,$sql)){
        echo "New record insert success ";
        
    }else{
        echo " Fail to insert ";
    }
?>