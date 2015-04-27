/*
##     ##     ###     ########   ####     ###     ########   ##         ########    ######
##     ##    ## ##    ##     ##   ##     ## ##    ##     ##  ##         ##         ##    ##
##     ##   ##   ##   ##     ##   ##    ##   ##   ##     ##  ##         ##         ##
##     ##  ##     ##  ########    ##   ##     ##  ########   ##         ######      ######
 ##   ##   #########  ##   ##     ##   #########  ##     ##  ##         ##               ##
  ## ##    ##     ##  ##    ##    ##   ##     ##  ##     ##  ##         ##         ##    ##
   ###     ##     ##  ##     ##  ####  ##     ##  ########   ########   ########    ######
*/
var doc 			= document,
	win 			= window,
	body 			= doc.body,
	app_lang 		= body.getAttribute('app_language'),
	// data_retrieved 	= 2,
	// data_process 	= 0,
	lang_array 		= [];

/*
########   ##     ##  ##    ##    ######    ########   ####   #######   ##    ##    ######
##         ##     ##  ###   ##   ##    ##      ##       ##   ##     ##  ###   ##   ##    ##
##         ##     ##  ####  ##   ##            ##       ##   ##     ##  ####  ##   ##
######     ##     ##  ## ## ##   ##            ##       ##   ##     ##  ## ## ##    ######
##         ##     ##  ##  ####   ##            ##       ##   ##     ##  ##  ####         ##
##         ##     ##  ##   ###   ##    ##      ##       ##   ##     ##  ##   ###   ##    ##
##          #######   ##    ##    ######       ##      ####   #######   ##    ##    ######
*/




// Object length
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



function data_load_check() {
	new struction(0, shops[ 0 ].categories.length );
	new struction(1, shops[ 1 ].categories.length );
	new translation( app_lang );
}

