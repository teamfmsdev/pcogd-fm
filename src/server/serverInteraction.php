<?php

// require "connection.php";

$callArg = $_POST['callArg'];

if($callArg=="save"){
    save();

}elseif($callArg=="retrieve"){
    retrieve();
}elseif($callArg=="deleteRecord"){
    deleteRecord();
}elseif($callArg=="Update"){
    Update();
}

?>