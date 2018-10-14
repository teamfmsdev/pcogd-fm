<?php

$callArg = $_POST['callArg'];

// TO-DO // SANITIZE EVERY INPUT USING MYSQL ESCAPE STRING

$con=mysqli_connect("localhost","root","","ms");
if(!$con){
    die('Could not connect '.mysqli_error($con));
}

if($callArg=="save"){
    save();

}elseif($callArg=="retrieve"){
    retrieve();
}elseif($callArg=="deleteRecord"){
    deleteRecord();
}elseif($callArg=="Update"){
    Update();
}

function deleteRecord(){
    $dataID=$_POST['dataID'];
    $callArg=$_POST['callArg'];

    $sql="DELETE FROM `main` WHERE row='$dataID'";

    $con=mysqli_connect("localhost","root","","ms");
    if (!$con){
        die ("Connection cannot be established". mysqli_connect_error($con));
    }

    if (mysqli_query($con, $sql)) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($con);
    }


}

function Update(){

    $wTitle =$_POST['wTitle'];
    $type1 = $_POST['type1'];
    $type2 = $_POST['type2'];
    $desc = $_POST['desc'];
    $loca = $_POST['loca'];
    $comp = $_POST['comp'];
    $stats = $_POST['stats'];
    $sapB = $_POST['sapB'];
    $reqB = $_POST['reqB'];
    $reqD = $_POST['reqD'];
    $clos = $_POST['clos'];
    $compl = $_POST['comple'];
    $callArg = $_POST['callArg'];
    $dataID = $_POST['dataID'];

    $con=mysqli_connect("localhost","root","","ms");
    if (!$con){
        die ("Connection cannot be established". mysqli_connect_error($con));
    }

    // $sql="SELECT `Work Title`,`Type 1`,`Type 2`,`Description`,`Location`,`Status`,`Company`,`SAP#`,`Request By`,`Request Date`,`Closed By`,`Completion Date` FROM `main` WHERE row='$dataID' ";

    $sql="UPDATE `main` SET `Work Title`='$wTitle',`Type 1`='$type1',`Type 2`='$type2',
            `Description`='$desc',`Location`='$loca',`Status`='$stats',`Company`='$comp',
            `SAP#`='$sapB',`Request By`='$reqB',`Request Date`='$reqD',`Closed By`='$clos',
            `Completion Date`='$compl' WHERE row='$dataID'";


    // $result=mysqli_query($con,$sql);    
    
    if (mysqli_query($con, $sql)) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . mysqli_error($con);
    }

    // while($row = mysqli_fetch_array($result)){
    //     $jsonData[]=$row;
    // }
    //  echo json_encode($jsonData);

}

function save(){

    $wTitle =$_POST['wTitle'];
    $type1 = $_POST['type1'];
    $type2 = $_POST['type2'];
    $desc = $_POST['desc'];
    $loca = $_POST['loca'];
    $comp = $_POST['comp'];
    $stats = $_POST['stats'];
    $sapB = $_POST['sapB'];
    $reqB = $_POST['reqB'];
    $reqD = $_POST['reqD'];
    $clos = $_POST['clos'];
    $compl = $_POST['comple'];
    $callArg = $_POST['callArg'];
    $con=mysqli_connect("localhost","root","","ms");
    if (!$con){
        die ("Connection cannot be established". mysqli_connect_error($con));
    }
    
    $sql ="INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, `Description`, `Location`, `Status`,
     `Company`, `SAP#`, `Request By`, `Request Date`, `Closed By`, `Completion Date`)
     VALUES ('$wTitle','$type1','$type2','$desc','$loca','$stats','$comp','$sapB','$reqB',
     '$reqD','$clos','$compl')";
    
    if (mysqli_query($con,$sql)){
        echo "New record insert success ";
        
    }else{
        echo "Fail to insert ";
    }
}   

function retrieve(){

    $wTitle =$_POST['wTitle'];
    $type1 = $_POST['type1'];
    $type2 = $_POST['type2'];
    $desc = $_POST['desc'];
    $loca = $_POST['loca'];
    $comp = $_POST['comp'];
    $stats = $_POST['stats'];
    $sapB = $_POST['sapB'];
    $reqB = $_POST['reqB'];
    $reqD = $_POST['reqD'];
    $clos = $_POST['clos'];
    $compl = $_POST['comple'];
    $callArg = $_POST['callArg'];
    $con=mysqli_connect("localhost","root","","ms");
    if (!$con){
        die ("Connection cannot be established". mysqli_connect_error($con));
    }

    $sql="SELECT * FROM main ";

    // CHANGE SQL TO REFLECT WHAT USER INPUT RATHER THAN RETRIEVE ALL

    $result=mysqli_query($con,$sql);    
        
       $jsonData=array();
        while($row = mysqli_fetch_array($result)){
            $jsonData[]=$row;
        }
    
        echo json_encode($jsonData);
        
}


?>