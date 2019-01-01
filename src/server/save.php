<?php

require "connection.php";

foreach ($_GET as $key => $value) {
  $data[$key] = $value;
}

$sql ="INSERT INTO `main`(`Work Title`, `Type 1`, `Type 2`, `Description`, `Location`, `Status`,
     `Company`, `SAP#`, `Request By`, `Request Date`, `Closed By`, `Completion Date`)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

$stmt=mysqli_prepare($con,$sql);

call_user_func_array()

// foreach ($data as $key => $value) {
  mysqli_stmt_bind_param($stmt,"s",$data["Work Title"]);
// }

echo "hehe";

?>