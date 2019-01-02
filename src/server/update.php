<?php

require "connection.php";

    
$wTitle =mysqli_real_escape_string($con, $_GET['wTitle']);
$type1 = mysqli_real_escape_string($con, $_GET['type1']);
$type2 = mysqli_real_escape_string($con, $_GET['type2']);
$desc = mysqli_real_escape_string($con, $_GET['desc']);
$loca = mysqli_real_escape_string($con, $_GET['loca']);
$comp = mysqli_real_escape_string($con, $_GET['comp']);
$stats = mysqli_real_escape_string($con, $_GET['stats']);
$sapB = mysqli_real_escape_string($con, $_GET['sapB']);
$reqB = mysqli_real_escape_string($con, $_GET['reqB']);
$reqD = mysqli_real_escape_string($con, $_GET['reqD']);
$clos = mysqli_real_escape_string($con, $_GET['clos']);
$compl = mysqli_real_escape_string($con, $_GET['comple']);
$dataID = mysqli_real_escape_string($con, $_GET['dataID']);


$sql="UPDATE `main` SET `Work Title`='$wTitle',`Type 1`='$type1',`Type 2`='$type2',
    `Description`='$desc',`Location`='$loca',`Status`='$stats',`Company`='$comp',
    `SAP#`='$sapB',`Request By`='$reqB',`Request Date`='$reqD',`Closed By`='$clos',
    `Completion Date`='$compl' WHERE row='$dataID'";


if (mysqli_query($con, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($con);
}
