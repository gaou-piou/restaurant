// Javascript Plugin by CODEARMADA Limited
// Struction Function

;( function( window ) {

	function struction(shop, cat_no) {
		this.shop = shop;
		this.categories = cat_no;
		this.shopClass = [".elaia", ".pepe"];
		this.fileTypes = ['.jpg', '.JPG', '.png', '.jpeg', '.JPEG'];

		this._init();
	}

	struction.prototype = {
		_init: function() {

			this._initEvents();
		},
		_initEvents: function() {
			var self = this;
			self._createCat();

			new mlPushMenu( doc.querySelector('.mp-menu' + this.shopClass[this.shop]), doc.querySelector( this.shopClass[this.shop] + ' .layer' ) );
		},
		_createCat: function() {
			var wrapper = document.querySelector('.mp-menu' + this.shopClass[this.shop] + " ul");

			for (var i = 0; i < this.categories; i++) {
				var cat = document.createElement('LI'),
					cat_id = shops[ this.shop ].categories[ i ].id,
					img_url = "";
					// cat_name = shops[ 0 ].categories[ i ].titles[ 'gr' ].text;

				this.dishes_html = "";
				this.dishes_no = shops[ this.shop ].categories[ i ].dishes.length;

				classie.add(cat, "icon");
				classie.add(cat, "icon-arrow-left");
				classie.add(cat, "cat_bg");
				cat.setAttribute("data-id", cat_id);
				cat.setAttribute("data-cat", i);
				cat.setAttribute("data-index", i);
				cat.setAttribute("data-shop", this.shop);

				this._createSubCat(i);

				this.fileTypes.forEach(function loop(element, index){
					if(loop.stop){ return; }

					if (imageExists("images/categories/level_1/" + cat_id + element)) {
						img_url = "images/categories/level_1/" + cat_id + element;
						loop.stop = true;
					} else
						img_url = "images/categories/level_1/default.png";
				});



				// if (imageExists("images/categories/level_1/" + cat_id + ".png")) {
				// 	img_url = "images/categories/level_1/" + cat_id + ".png";
				// } else if (imageExists("images/categories/level_1/" + cat_id + ".jpg")) {
				// 	img_url = "images/categories/level_1/" + cat_id + ".jpg";
				// } else if (imageExists("images/categories/level_1/" + cat_id + ".JPG")) {
				// 	mg_url = "images/categories/level_1/" + cat_id + ".JPG";
				// } else if (imageExists("images/categories/level_1/" + cat_id + ".jpeg")) {
				// 	img_url = "images/categories/level_1/" + cat_id + ".jpeg";
				// } else if (imageExists("images/categories/level_1/" + cat_id + ".JPEG")) {
				// 	img_url = "images/categories/level_1/" + cat_id + ".JPEG";
				// } else {
				// 	img_url = "images/categories/level_1/default.png";
				// };

				cat.innerHTML = '<img class="menu_cat_image" src="' + img_url + '" /><a class="menu_cat editable" href="#" edit-type="menu_cat"></a><div class="mp-level"><h2 class="icon icon-display"></h2><a class="mp-back" href="#">back</a><ul>' + this.dishes_html + '</ul></div>';

				wrapper.appendChild(cat);
			};
		},
		_createSubCat: function(shop) {
			for (var i = 0; i < this.dishes_no; i++) {
				var img_url = "",
					cat_id 	= shops[ this.shop ].categories[ shop ].dishes[i].id;


				// if (imageExists("images/categories/level_2/" + cat_id + ".png")) {
				// 	img_url = "images/categories/level_2/" + cat_id + ".png";
				// } else if (imageExists("images/categories/level_2/" + cat_id + ".jpg")) {
				// 	img_url = "images/categories/level_2/" + cat_id + ".jpg";
				// } else if (imageExists("images/categories/level_2/" + cat_id + ".JPG")) {
				// 	mg_url = "images/categories/level_2/" + cat_id + ".JPG";
				// } else if (imageExists("images/categories/level_2/" + cat_id + ".jpeg")) {
				// 	img_url = "images/categories/level_2/" + cat_id + ".jpeg";
				// } else if (imageExists("images/categories/level_2/" + cat_id + ".JPEG")) {
				// 	img_url = "images/categories/level_2/" + cat_id + ".JPEG";
				// } else {
				// 	img_url = "images/categories/level_2/default.png";
				// };

				this.fileTypes.forEach(function loop(element, index){
					if(loop.stop){ return; }

					if (imageExists("images/categories/level_2/" + cat_id + element)) {
						img_url = "images/categories/level_2/" + cat_id + element;
						loop.stop = true;
					} else
						img_url = "images/categories/level_2/default.png";
				});

				this.dishes_html = this.dishes_html.concat('<li class="sub_cat_bg" data-id="' + cat_id + '" data-cat="' + shop + '" data-index="' + i + '" data-shop="' + this.shop + '"><div class="click_layer" onclick="javascript: new open_dish(event, this);"></div><img class="menu_cat_image" src="' + img_url + '" /><a class="dishes editable" edit-type="sub_menu_cat" href="#">' + shops[ this.shop ].categories[ shop ].dishes[i].titles[ 'gr' ].text + '</a></li>');
			};
		}

	}

	window.struction = struction;

} )( window );



