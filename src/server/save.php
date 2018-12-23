<?php
    require "connection.php";
    
    $wTitle =mysqli_real_escape_string($con,$_POST['wTitle']);
    $type1 = mysqli_real_escape_string($con,$_POST['type1']);
    $type2 = mysqli_real_escape_string($con,$_POST['type2']);
    $desc = mysqli_real_escape_string($con,$_POST['desc']);
    $loca = mysqli_real_escape_string($con,$_POST['loca']);
    $comp = mysqli_real_escape_string($con,$_POST['comp']);
    $stats = mysqli_real_escape_string($con,$_POST['stats']);
    $sapB = mysqli_real_escape_string($con,$_POST['sapB']);
    $reqB = mysqli_real_escape_string($con,$_POST['reqB']);
    $reqD = mysqli_real_escape_string($con,$_POST['reqD']);
    $clos = mysqli_real_escape_string($con,$_POST['clos']);
    $compl = mysqli_real_escape_string($con,$_POST['comple']);
    $callArg = mysqli_real_escape_string($con,$_POST['callArg']);
    
    
    
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