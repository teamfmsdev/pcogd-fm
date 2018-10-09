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