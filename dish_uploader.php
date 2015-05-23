<?php
$ds          = "/";  //1

$newName = $_POST["newname"];
$extension = explode("/", $_FILES['file']['type']);

$storeFolder = 'images/dishes/';   //2










if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];          //3

    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
    
    $file_3_exists = count(glob($storeFolder . $newName . "_3.*"));
	$file_2_exists = count(glob($storeFolder . $newName . "_2.*"));
	$file_1_exists = count(glob($storeFolder . $newName . "_1.*"));
	
	if( $file_3_exists > 0 ) {
		array_map('unlink', glob($targetPath . "/" . $newName . "_*.*"));
		$newName = $newName . "_1";
	} else if( $file_2_exists > 0 ) 
		$newName = $newName . "_3";
	else if( $file_1_exists > 0 ) 
		$newName = $newName . "_2";
	else 
		$newName = $newName . "_1";
	
	
/*
	echo '<pre>';
   
	echo $file_3_exists;
	echo $file_2_exists;
	echo $file_1_exists;
	echo $targetPath . "/" . $newName . "_*.*";

	print "</pre>";
*/

	

    //remove prev files
    array_map('unlink', glob($targetPath . $newName . ".*"));

    $targetFile =  $targetPath . $newName . "." . $extension[1];  //5

    move_uploaded_file($tempFile,$targetFile); //6

}
?>