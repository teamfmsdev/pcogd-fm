<?php
    $dataID=$_GET['dataID'];


    $sql="DELETE FROM `main` WHERE row='$dataID'";

    require "connection.php";

    if (mysqli_query($con, $sql)) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($con);
    }
?>