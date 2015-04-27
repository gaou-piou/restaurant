/*
##     ##     ###     ########   ####     ###     ########   ##         ########    ######
##     ##    ## ##    ##     ##   ##     ## ##    ##     ##  ##         ##         ##    ##
##     ##   ##   ##   ##     ##   ##    ##   ##   ##     ##  ##         ##         ##
##     ##  ##     ##  ########    ##   ##     ##  ########   ##         ######      ######
 ##   ##   #########  ##   ##     ##   #########  ##     ##  ##         ##               ##
  ## ##    ##     ##  ##    ##    ##   ##     ##  ##     ##  ##         ##         ##    ##
   ###     ##     ##  ##     ##  ####  ##     ##  ########   ########   ########    ######
*/

var home_header 	= doc.getElementById('home_header');



/*
########   ##     ##  ##    ##    ######    ########   ####   #######   ##    ##    ######
##         ##     ##  ###   ##   ##    ##      ##       ##   ##     ##  ###   ##   ##    ##
##         ##     ##  ####  ##   ##            ##       ##   ##     ##  ####  ##   ##
######     ##     ##  ## ## ##   ##            ##       ##   ##     ##  ## ## ##    ######
##         ##     ##  ##  ####   ##            ##       ##   ##     ##  ##  ####         ##
##         ##     ##  ##   ###   ##    ##      ##       ##   ##     ##  ##   ###   ##    ##
##          #######   ##    ##    ######       ##      ####   #######   ##    ##    ######
*/


function add_editability(el) {
	var parent_el 	= el.parentNode.parentNode.parentNode.parentNode,
		objects 	= query('.translation_object', parent_el),
		lang 		= el.getAttribute("lang"),
		lang_check 	= query('.lg-list-item', parent_el),
		pen_options = 	{
							list: ['bold', 'italic', 'underline']
						};

	lang_check.forEach(function(element, index){
		element.querySelector("input").checked = false;
	});

	el.checked = true;

	objects.forEach(function(element, index){
		if (classie.has(element, lang)){
			element.style.opacity = 1;
			element.style.visibility = "visible";
			new Pen(element);
		} else {
			element.style.opacity = 0;
			element.style.visibility = "hidden";
		}
	});

}



/*
########   ########      ###     ########   ##    ##
##     ##  ##           ## ##    ##     ##   ##  ##
##     ##  ##          ##   ##   ##     ##    ####
########   ######     ##     ##  ##     ##     ##
##   ##    ##         #########  ##     ##     ##
##    ##   ##         ##     ##  ##     ##     ##
##     ##  ########   ##     ##  ########      ##
*/

doc.addEventListener("DOMContentLoaded", function() {
	var home_select_els 	= query('.start_brand_area', doc);
	var editable_els		= query('.editable', body);
	var menu_levels 		= query('.mp-level', body);



	TweenMax.set(doc.getElementById('page'), {perspective:800, transformStyle: "preserve-3d"});
	TweenMax.set(home_select_els[0], {transformOrigin: "left center"});
	TweenMax.set(home_select_els[1], {transformOrigin: "right center"});

	home_select_els.forEach(function(element, index){
		// element.addEventListener("click", function() {
		// 	home_select_els[1-index].style.zIndex = "1";
		// 	TweenMax.to(home_select_els[index], 1.2, {
		// 		width: "100%",
		// 		ease:  Power4.easeOut
		// 	});
		// 	TweenMax.to(home_select_els[1-index], 1.6, {
		// 		// z: -500,
		// 		scale:0.6,
		// 		opacity:0,
		// 		ease:  Power4.easeOut
		// 	});
		// });
	});

	menu_levels.forEach(function(element, index){
		// Draggable.create(element.childNodes[2], {
		// 	type:"scrollTop"
		// });
	});


	data_load_check();

	// new mlPushMenu( doc.getElementById('mp-menu'), doc.querySelector( '.elaia .layer' ) );

});

