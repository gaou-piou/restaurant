<?php
$ds          = "/";  //1

$newName = $_POST["newname"];
$type = $_POST["type"];
$extension = explode("/", $_FILES['file']['type']);
$storeFolder = 'images/categories/level_' . $type;   //2

if (!empty($_FILES)) {




	$tempFile = $_FILES['file']['tmp_name'];          //3

	$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4

	$targetFile =  $targetPath . $newName . "." . $extension[1];  //5



	array_map('unlink', glob($targetPath . $newName . ".*"));


	move_uploaded_file($tempFile,$targetFile); //6

	$xml = fopen( $targetPath . $newName . ".xml", "w+") or die("Unable to open file!");
	$txt = '<?xml version="1.0" encoding="UTF-8"?><note><ext>' . $extension[1] . '</ext></note>';
	fwrite($xml, $txt);
	fclose($xml);

//
//	 echo '<pre>';
//	 echo $newname;
//	 if (move_uploaded_file($tempFile,$targetFile)) {
//		 echo "File is valid, and was successfully uploaded.\n";
//	 } else {
//		 echo "Possible file upload attack!\n";
//		 print_r(error_get_last());
//	 }
//
//	 echo 'Here is some more debugging info:';
//	 print_r($_FILES);
//
//	 print "</pre>";

}
?>
