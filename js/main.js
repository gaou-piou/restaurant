/*
##     ##     ###     ########   ####     ###     ########   ##         ########    ######
##     ##    ## ##    ##     ##   ##     ## ##    ##     ##  ##         ##         ##    ##
##     ##   ##   ##   ##     ##   ##    ##   ##   ##     ##  ##         ##         ##
##     ##  ##     ##  ########    ##   ##     ##  ########   ##         ######      ######
 ##   ##   #########  ##   ##     ##   #########  ##     ##  ##         ##               ##
  ## ##    ##     ##  ##    ##    ##   ##     ##  ##     ##  ##         ##         ##    ##
   ###     ##     ##  ##     ##  ####  ##     ##  ########   ########   ########    ######
*/
var doc 		= document,
	win 		= window,
	body 		= doc.body;
var languages, shops;
/*
########   ##     ##  ##    ##    ######    ########   ####   #######   ##    ##    ######
##         ##     ##  ###   ##   ##    ##      ##       ##   ##     ##  ###   ##   ##    ##
##         ##     ##  ####  ##   ##            ##       ##   ##     ##  ####  ##   ##
######     ##     ##  ## ## ##   ##            ##       ##   ##     ##  ## ## ##    ######
##         ##     ##  ##  ####   ##            ##       ##   ##     ##  ##  ####         ##
##         ##     ##  ##   ###   ##    ##      ##       ##   ##     ##  ##   ###   ##    ##
##          #######   ##    ##    ######       ##      ####   #######   ##    ##    ######
*/


// Query function
    function query(selector, node) {
        if (typeof node === 'undefined') {
            node = document;
        }

        return [].slice.call(node.querySelectorAll(selector));
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

doc.addEventListener( 'DOMContentLoaded', function() {
	access_php( 'get', 'languages', 0 );
	access_php( 'get', 'shops', 0 );
} );


function access_php ( theAction, theObject, theID ) {
	reqwest ( {
		url : 		'php_access/php_access.php',
		method : 	'post',
		data : 		{
				action		: theAction,
				theObject	: theObject,
				id 		: theID
				},
		success : 	function( response ) {
console.log( response );
			var errors = [
				'no connection could be established to database.',
				'no data has been read.'
			];
			var gotData = response.split( '@!' );
			switch ( gotData[ 0 ] ) {
				case 'get' :
					if ( gotData[ 3 ] == 0 ) {
						switch ( gotData[ 1 ] ) {
							case 'languages' :
								languages = JSON.parse( gotData[ 4 ] );
								break;
							case 'shops' :
								// languages = JSON.parse( gotData[ 4 ] );
								break;
						}
					} else {
						console.log ( errors[ ( gotData[ 3 ] - 1 ) ] );
					}
					break;
			}
		}
	} );
}

