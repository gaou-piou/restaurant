<?php
class shop {
	public $id;
	public $caption;

	public function __construct( $theID, $theCaption ) {
		$this->id = $theID;
		$this->caption = $theCaption;
	}
}

?>
