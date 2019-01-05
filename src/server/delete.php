<?php
require "connection.php";

    $stmt = $con -> prepare("DELETE FROM `main` WHERE row=?");
        
    $stmt -> bindValue(1,$_GET["dataId"]);

    if($stmt ->execute()){
        echo "Record deleted succesfully";
    }else{
        echo "Error deleting record";
    }
    
?>