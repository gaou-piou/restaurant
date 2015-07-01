// language change scripting
// by
// CODEARMADA Limited


;( function( window ) {
	function language(pointer) {
		this.pointer = pointer;
		this.dot = document.getElementById('lang_Layer').querySelector('.dot');

		this._init();
	}

	language.prototype = {

		_init : function() {

			this._initEvents();
		},
		_initEvents : function() {
			var self = this;
			self._moveDot();
		},
		_moveDot: function() {
			var self = this;
			TweenMax.to(self.dot, 1.2, {
				x: this.pointer * 45,
				y: "-50%",
				backgroundPosition: this.pointer.map(0,7,1.5,98.5) + "% center",
				delay:.4,
				ease: Power4.easeOut
			});
		}
	}

	// add to global namespace
	window.language = language;

} )( window );
