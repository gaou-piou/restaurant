/*
 ######    ########   ##    ##   ########   ########      ###     ##
##    ##   ##         ###   ##   ##         ##     ##    ## ##    ##
##         ##         ####  ##   ##         ##     ##   ##   ##   ##
##   ####  ######     ## ## ##   ######     ########   ##     ##  ##
##    ##   ##         ##  ####   ##         ##   ##    #########  ##
##    ##   ##         ##   ###   ##         ##    ##   ##     ##  ##
 ######    ########   ##    ##   ########   ##     ##  ##     ##  ########
*/

// Query function
function query(selector, node) {
	if (typeof node === 'undefined') {
		node = document;
	}

	return [].slice.call(node.querySelectorAll(selector));
}

// map range
// num.map( 0 , 10 , -50 , 50 )
Number.prototype.map=function(a,b,c,d){return c+(d-c)*((this-a)/(b-a))};

// prevent defaults
function cancelDefaultAction(e) {
	var evt = e ? e:window.event;
	if (evt.preventDefault) evt.preventDefault();
	evt.returnValue = false;
	return false;
}

// inserAfter
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}



// menu category edit button
function menu_cat_edit(that) {
	var ul = that.parentNode.parentNode.querySelector('ul.first_ul'),
		cat_images = query('img.menu_cat_image', ul);
		edit_nodes = query('.menu_edit_node', ul),
		toggled = classie.has(that, "toggled");

	if (!toggled){
		edit_nodes.forEach(function(element, index){
			element.style.visibility = 'visible';
		});
		classie.add(that, "toggled");
		TweenMax.staggerFromTo(edit_nodes, 0.45, {
			opacity: 0,
			scale: 0.3
		},{
			opacity:1,
			scale: 1,
			ease: Back.easeOut
		},0.05);

		TweenMax.staggerTo(cat_images, 0.3, {
			scale: 0.3,
			opacity: 0
		},0.05);
	} else {
		function visibility() {
			edit_nodes.forEach(function(element, index){
				element.style.visibility = 'hidden';
			});
		};

		classie.remove(that, "toggled");
		TweenMax.staggerFromTo(edit_nodes, 0.3, {
			opacity: 1,
			scale: 1
		},{
			opacity:0,
			scale: 0.3
		},0.05, visibility);

		TweenMax.staggerTo(cat_images, 0.45, {
			scale: 1,
			opacity: 1,
			ease: Back.easeOut
		},0.05);
	};




}