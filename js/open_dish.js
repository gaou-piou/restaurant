// open dishes scripting
// by
// CODEARMADA Limited


;( function( window ) {
	function open_dish(e, that) {
		this.el = that.parentNode;
		this.page = document.getElementById('page_wrapper');
		this.dish = document.getElementById('dish_area');
		this.lang = document.body.getAttribute('app_language');
		this.shop = 0;
		this.cat = 0;
		this.id = this.el.getAttribute('data-id');
		this.fileTypes = ['.jpg', '.JPG', '.png', '.jpeg', '.JPEG'];

		if (that !== e.target.parentNode.parentNode.parentNode.parentNode.parentNode && that !== e.target.parentNode )
			this._init();
		else
			return;
	}

	open_dish.prototype = {


		_init : function() {

			this._initEvents();
		},
		_initEvents : function() {
			var self = this;

			self._loadSounds();
			self._rememberPosition();
			self._getContent();
			self._createInfo();

			self._disappearPage();

			// alert(this.el.innerHTML);
		},
		_isCanPlayMP3: function isCanPlayMP3() {
		    var userAgent = navigator.userAgent;
		    return !(userAgent.indexOf('Opera') && userAgent.indexOf('firefox') > -1);
		},
		_loadSounds: function() {
			var self = this;
			
			this.ext = self._isCanPlayMP3() ? 'mp3' : 'wav';
			
			this.openSound = new Howl({ urls: ['sounds/open-bubble-2.' + this.ext] });
		    this.openSound2 = new Howl({ urls: ['sounds/open-bubble-3.' + this.ext], rate: 0.15 });
		    this.bounceSound = new Howl({ urls: ['sounds/bounce.' + this.ext] });
		    this.closeSound = new Howl({ urls: ['sounds/bubble-single-1.' + this.ext], rate: 0.5 });
		    this.closeSound2 = new Howl({ urls: ['sounds/bubble-single-1.' + this.ext], rate: 0.75 });
		    this.closeSound3 = new Howl({ urls: ['sounds/bubble-single-1.' + this.ext], rate: 0.85 });
		    this.closeScaleSound = new Howl({ urls: ['sounds/open-bubble-3.' + this.ext], rate: 0.25 });
// 		    this.closeBtnSound = new Howl({ urls: ['sounds/open-bubble-3.mp3'], rate: 1 });
		},
		_createInfo: function() {
			var self = this;
			this.dish.querySelector('header').innerHTML = 	'<div class="menu_button">'
																+ '<i class="flaticon1-nine6"></i>'
															+ '</div>'
															+ '<div class="titles">'
																+ '<h2 class="main_title">' + this.title + '</h2>'
																+ '<h5 class="secondray_title">' + this.catTitle + '</h5>'
															+ '</div>'
															+ '<div class="home_button">'
																+ '<i class="flaticon1-outline11"></i>'
															+ '</div>';
			var string = "";

			for (var i = 1; i <= 3; i++) {
				this.fileTypes.forEach(function loop(element, index){
					if(loop.stop){ return; }

					if ( imageExists("images/dishes/" + self.id + "_" + i + element) ) {
						img_url = "images/dishes/" + self.id + "_" + i + element;
						string = string.concat('<img src="' + img_url + '" />');
						loop.stop = true;
					}
				});
			};

			if ( string == "" ) {
				string = '<img src="images/dishes/default.jpg" /> <img src="images/dishes/default.jpg" />';
			};

			this.dish.querySelector('.slider > ul').innerHTML = string;

			this.dish.querySelector('.caption_wrapper').innerHTML = this.description;
			this.dish.querySelector('.price').innerHTML = this.price;
		},
		_getContent: function() {
			this.title = shops[ this.shop ].categories[ this.cat ].dishes[ this.index ].titles[ this.lang ].text;
			this.catTitle = shops[ this.shop ].categories[ this.cat ].titles[ this.lang ].text;
			this.description = shops[ this.shop ].categories[ this.cat ].dishes[ this.index ].descriptions[ this.lang ].text;
			this.price = shops[ this.shop ].categories[ this.cat ].dishes[ this.index ].value;
		},
		_rememberPosition: function() {
			this.shop = this.el.getAttribute('data-shop');
			this.cat = this.el.getAttribute('data-cat');
			this.index = this.el.getAttribute('data-index');

			// console.log("this shop="+this.shop+" ,this catyegory="+ this.cat);
			// this.dish = this.el.getAttribute('data-index');
		},
		_reopenPosition: function() {
			var self = this;

			fireEvent( document.getElementById('page_wrapper').querySelector('.start_brand_area[data-shop="' + this.shop + '"] .layer'), "click" );

			setTimeout(function() {
				fireEvent(document.getElementById('page').querySelector('nav.mp-menu[data-shop="' + self.shop + '"]').querySelector('.first_ul li[data-cat="' + self.cat + '"] a.menu_cat'), "click");
			}, 500);
		},
		_appearPage: function(flag) {
			var self = this;

			TweenMax.to(self.page, 1, {
				opacity: 1,
				scale: 1,
				ease:Power2.easeIn
			});

			if (flag == 1)
				setTimeout(function() {self._reopenPosition();},1000);
		},
		_disappearPage: function() {
			var self = this;

			fireEvent(document.getElementById('page'), "click");

			TweenMax.to(self.page, 0.6, {
				opacity: 0,
				scale: 0.8,
				delay:0.2,
				ease:Power2.easeIn
			});
			self._appearDish();
		},
		_appearDish: function() {
			var self = this;
			
			self.openSound.play();

			var slider = new IdealImageSlider.Slider({
				selector: '#slider',
				interval: 6000,
				transitionDuration: 2200,
				keyboardNav: false
			});
			slider.addBulletNav();
			slider.start();

			TweenMax.fromTo(self.dish, 1, {
				x:"100%",
				opacity:0
			},{
				x:"0%",
				opacity: 1,
				delay:0.2,
				ease: Power2.easeInOut
			});

			document.getElementById('dish_area').querySelector('.menu_button > i').addEventListener("click", function() {
				self.closeScaleSound.play();
				self._disappearDish();
			});

			document.getElementById('dish_area').querySelector('.home_button > i').addEventListener("click", function() {
				self.closeScaleSound.play();
				self._returnHome();
			});
		},
		_disappearDish: function() {
			var self = this;

			TweenMax.to(self.dish, 0.6, {
				x:"100%",
				opacity: 0,
				ease: Power2.easeIn
			});

			self._appearPage(1);
		},
		_returnHome: function() {
			var self = this;

			TweenMax.to(self.dish, 0.6, {
				x:"100%",
				opacity: 0,
				ease: Power2.easeIn
			});

			self._appearPage();
		}




	}

	// add to global namespace
	window.open_dish = open_dish;

} )( window );
