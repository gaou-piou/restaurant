<?php 
include 'php_mysql.php';
global $db_User, $db_Password, $db_Name, $db_Host;

function array_push_assoc( $array, $key, $value ) {
	$array[ $key ] = $value;
	return $array;
}

spl_autoload_register( function ( $class ) {
    include 'classes/' . $class . '.class.php';
} );


$action = $_POST[ 'action' ];
$curObject = $_POST[ 'theObject' ];
$curID = $_POST[ 'id' ];

$ret = $action . '@!' . $curObject. '@!' . $curID. '@!';
$conn = new mysqli( $db_Host, $db_User, $db_Password, $db_Name );
if ( $conn ) {
	switch ( $action ) {
		case 'get':
			switch ( $curObject ) {
				case 'languages':
					$sql = "SELECT * FROM `language` WHERE 1 ORDER BY `lang_id`";
					$result = $conn->query( $sql );
					if ( $result->num_rows > 0 ) {
						$theLanguages = array();
						while( $row = $result->fetch_assoc() ) {
							$theLanguages = array_push_assoc(
								$theLanguages,
								$row[ 'lang_what' ],
								new language( $row[ 'lang_id' ], $conn )
							);
						}
						$ret .= '0@!' . json_encode( $theLanguages );
					} else {
						$ret .= '2@!0';   // No languages
					}
					break;
				case 'shops':


				
					break;
			}
			break;
	}

	$conn->close();
} else {
	$ret .= 1;	// No connection
}

echo $ret;
die ();

?>
