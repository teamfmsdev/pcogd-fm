<?php

$con=mysqli_connect("localhost", "root", "", "test");
if (!$con) {
    die('Could not connect '.mysqli_error($con));
}
