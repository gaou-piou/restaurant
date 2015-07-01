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


// Image exists on server
function imageExists(image_url){

	var http = new XMLHttpRequest();

	http.open('HEAD', image_url, false);
	http.send();

	return http.status != 404;

}


// menu category edit button
function menu_cat_edit(that) {
	var ul = that.parentNode.nextElementSibling,
		cat_images = query('img.menu_cat_image', ul);
		edit_nodes = query('.menu_edit_node', ul),
		toggled = classie.has(that, "toggled");

	if (!toggled){
		edit_nodes.forEach(function(element, index){
			element.style.visibility = 'visible';
		});
		classie.add(that, "toggled");
		classie.add(that.parentNode.parentNode, "editable");

		TweenMax.staggerFromTo(edit_nodes, 0.45, {
			opacity: 0,
			scale: 0.3,
			x:50,
			y:"-100%"
		},{
			opacity:1,
			scale: 1,
			x:50,
			y:"-100%",
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
		classie.remove(that.parentNode.parentNode, "editable");
		TweenMax.staggerFromTo(edit_nodes, 0.3, {
			opacity: 1,
			scale: 1,
			x:50,
			y:"-100%"
		},{
			opacity:0,
			scale: 0.3,
			x:50,
			y:"-100%"
		},0.05, visibility);

		TweenMax.staggerTo(cat_images, 0.45, {
			scale: 1,
			opacity: 1,
			ease: Back.easeOut
		},0.05);
	};




}

// Fire Event Function
function fireEvent(node, eventName) {
	// Make sure we use the ownerDocument from the provided node to avoid cross-window problems
	var doc;
	if (node.ownerDocument) {
		doc = node.ownerDocument;
	} else if (node.nodeType == 9){
		// the node may be the document itself, nodeType 9 = DOCUMENT_NODE
		doc = node;
	} else {
		throw new Error("Invalid node passed to fireEvent: " + node.id);
	}

	 if (node.dispatchEvent) {
		// Gecko-style approach (now the standard) takes more work
		var eventClass = "";

		// Different events have different event classes.
		// If this switch statement can't map an eventName to an eventClass,
		// the event firing is going to fail.
		switch (eventName) {
			case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
			case "mousedown":
			case "mouseup":
				eventClass = "MouseEvents";
				break;

			case "focus":
			case "change":
			case "blur":
			case "select":
				eventClass = "HTMLEvents";
				break;

			default:
				throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
				break;
		}
		var event = doc.createEvent(eventClass);

		var bubbles = eventName == "change" ? false : true;
		event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

		event.synthetic = true; // allow detection of synthetic events
		// The second parameter says go ahead with the default action
		node.dispatchEvent(event, true);
	} else  if (node.fireEvent) {
		// IE-old school style
		var event = doc.createEventObject();
		event.synthetic = true; // allow detection of synthetic events
		node.fireEvent("on" + eventName, event);
	}
};

function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
		xhttp=new XMLHttpRequest();
	else // code for IE5 and IE6
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xhttp.open("GET",filename,false);
	xhttp.send();
	return xhttp.responseXML;
}


function unwrap(i) {
    var wrapper = i.parentNode.getElementsByClassName('wrapper')[0];
    // return if wrapper already been unwrapped
    if (typeof wrapper === 'undefined') return false;
    // remmove the wrapper from img
    i.parentNode.innerHTML = wrapper.innerHTML + i.outerHTML;
    return true;
}


/*
 *
 *
 *	GENERAL VARIABLES
 *
 */
//
// function isCanPlayMP3() {
// 	var userAgent = navigator.userAgent;
// 	return !(userAgent.indexOf('Opera') && userAgent.indexOf('firefox') > -1);
// }
//
// var playable_ext = isCanPlayMP3() ? 'mp3' : 'wav';
//
// var	dish_sound_openSound = new Howl({ urls: ['sounds/open-bubble-2.' + playable_ext], rate: 0.6, onload: console.log("loaded") }),
// 	dish_sound_closeScaleSound = new Howl({ urls: ['sounds/open-bubble-3.' + playable_ext], rate: 0.6, onload: console.log("loaded") })
//
//
// var	menu_sound_openSound2 = new Howl({ urls: ['sounds/open-bubble-3.' + playable_ext], rate: 0.5, onload: console.log(playable_ext) }),
// 	menu_sound_closeSound = new Howl({ urls: ['sounds/bubble-single-1.' + playable_ext], rate: 0.5 }),
// 	menu_sound_closeSound3 = new Howl({ urls: ['sounds/bubble-single-1.' + playable_ext], rate: 0.5 });
//
