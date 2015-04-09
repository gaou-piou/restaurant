<?php
class content {
	public $id;
	public $lang_id;
	public $text;

	public function __construct( $theID, $theLangID, $theText ) {
		$this->id = $theID;
		$this->lang_id = $theLangID;
		$this->text = $theText;
	}
}

?>