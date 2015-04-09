<?php
class language {
	public $id;
	public $what;
	public $abbreviations;
	public $titles;

	public function __construct( $theID=0, $conn ) {
		if ( $conn->connect_error ) {
			$this->id = 0;
		} else {
			if ( $theID == 0 ) {
				$theID = 1;
			}
			$sql = "SELECT * FROM `language` WHERE `lang_id`=" . $theID;
			$result = $conn->query( $sql );
			if ( $result->num_rows > 0 ) {
				$this->id = $theID;
				while( $row = $result->fetch_assoc() ) {
					$this->what = $row[ 'lang_what' ];
				}
				$this->abbreviations = array ();
				$sql = "SELECT `language`.`lang_what`, `content`.`content_id`, `content`.`content_lang_id`, `content`.`content_text` FROM `language` INNER JOIN `content` ON `language`.`lang_id`=`content`.`content_lang_id` INNER JOIN `object` ON `content`.`content_object_id`=`object`.`object_id` INNER JOIN `content_type` ON `content`.`content_contype_id`=`content_type`.`content_type_id` WHERE `content`.`content_owner_id`=" . $theID . " AND `object`.`object_title`='language' AND `content_type`.`content_type_title`='abbreviation' ORDER BY `content`.`content_lang_id`";
				$result = $conn->query( $sql );
				if ( $result->num_rows > 0 ) {
					while( $row = $result->fetch_assoc() ) {
						$this->abbreviations = array_push_assoc(
							$this->abbreviations,
							$row[ 'lang_what' ],
							new content ( $row[ 'content_id' ], $row[ 'content_lang_id' ], $row[ 'content_text' ] )
						);
					}
				}
				$this->titles = array ();
				$sql = "SELECT `language`.`lang_what`, `content`.`content_id`, `content`.`content_lang_id`, `content`.`content_text` FROM `language` INNER JOIN `content` ON `language`.`lang_id`=`content`.`content_lang_id` INNER JOIN `object` ON `content`.`content_object_id`=`object`.`object_id` INNER JOIN `content_type` ON `content`.`content_contype_id`=`content_type`.`content_type_id` WHERE `content`.`content_owner_id`=" . $theID . " AND `object`.`object_title`='language' AND `content_type`.`content_type_title`='title' ORDER BY `content`.`content_lang_id`";
				$result = $conn->query( $sql );
				if ( $result->num_rows > 0 ) {
					while( $row = $result->fetch_assoc() ) {
						$this->titles = array_push_assoc(
							$this->titles,
							$row[ 'lang_what' ],
							new content ( $row[ 'content_id' ], $row[ 'content_lang_id' ], $row[ 'content_text' ] )
						);
					}
				}
			}
		}
	}
}

?>