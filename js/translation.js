// Javascript Plugin by CODEARMADA Limited
// Translate Function
;( function( window ) {

	var for_translation_els 	= query(".custom_trans", document);

	function translation(lang) {
		this.lang = lang;
		this._init();
	}

	translation.prototype = {
		_init: function() {
			this.trans_lang_no 	=	Object.size(languages);

			this._initEvents();

		},
		_initEvents: function() {
			body.setAttribute('app_language', this.lang);
			classie.remove(home_header.querySelector('.language .active'), "active");
			classie.add(home_header.querySelector("." + this.lang), "active");

			// this._headerTranslation();
			this._homeContent();
			this._catContent();
			this._customTranslation();
		},
		_headerTranslation: function() {
			for(var key in languages) {
				home_header.querySelector( "." + languages[key].abbreviations[ 'en' ].text ).innerHTML = languages[key].titles[ this.lang ].text;
			}
		},
		_homeContent: function() {
			var els = query('.start_brand_area', body);

			for(var key in shops) {
				els[key].querySelector('.brand_content').innerHTML = shops[ key ].descriptions[ this.lang ].text;
			}
		},
		_catContent: function() {
			var els_elaia 	= query('.menu_cat', document.getElementById('mp-menu')),
				els_pepe 	= query('.menu_cat', document.getElementById('mp-menu2'));

			for(var key in els_elaia) {
				els_elaia[key].innerHTML = shops[ 0 ].categories[ key ].titles[ this.lang ].text;
				els_elaia[key].parentNode.querySelector('h2').innerHTML = shops[ 0 ].categories[ key ].titles[ this.lang ].text;
				var dishes = query('.dishes', els_elaia[key].parentNode);
				for(var i in dishes) {
					dishes[i].innerHTML = shops[ 0 ].categories[ key ].dishes[i].titles[ this.lang ].text;
				}
			}
			for(var key in els_pepe) {
				els_pepe[key].innerHTML = shops[ 1 ].categories[ key ].titles[ this.lang ].text;
				els_pepe[key].parentNode.querySelector('h2').innerHTML = shops[ 1 ].categories[ key ].titles[ this.lang ].text;
				var dishes = query('.dishes', els_pepe[key].parentNode);
				for(var i in dishes) {
					dishes[i].innerHTML = shops[ 1 ].categories[ key ].dishes[i].titles[ this.lang ].text;
				}
			}
		},
		_customTranslation: function() {
			for(var key in for_translation_els) {
				for_translation_els[key].innerHTML = for_translation_els[key].getAttribute("lang-" + this.lang);
			}
		}

	}

	window.translation = translation;

} )( window );
