<?php
$ds          = "/";  //1

$newName = $_POST["newname"];
$type = $_POST["type"];
$extension = explode("/", $_FILES['file']['type']);

$storeFolder = 'images/categories/level_' . $type;   //2

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];          //3

    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4

    //remove prev files
    array_map('unlink', glob($targetPath . $newName . ".*"));

    $targetFile =  $targetPath . $newName . "." . $extension[1];  //5

    move_uploaded_file($tempFile,$targetFile); //6
 //    echo '<pre>';
 //    echo $newname;
 //    echo $type;
	// if (move_uploaded_file($tempFile,$targetFile)) {
	//     echo "File is valid, and was successfully uploaded.\n";
	// } else {
	//     echo "Possible file upload attack!\n";
	//     print_r(error_get_last());
	// }

	// echo 'Here is some more debugging info:';
	// print_r($_FILES);

	// print "</pre>";

}
?>