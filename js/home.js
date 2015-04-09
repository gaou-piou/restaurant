

doc.addEventListener("DOMContentLoaded", function() {
	var home_select_els 	= query('.start_brand_area', doc);

	TweenMax.set(doc.getElementById('page'), {perspective:800, transformStyle: "preserve-3d"});
	TweenMax.set(home_select_els[0], {transformOrigin: "left center"});
	TweenMax.set(home_select_els[1], {transformOrigin: "right center"});

	home_select_els.forEach(function(element, index){
		element.addEventListener("click", function() {
			home_select_els[1-index].style.zIndex = "1";
			TweenMax.to(home_select_els[index], 1.2, {
				width: "100%",
				ease:  Power4.easeOut
			});
			TweenMax.to(home_select_els[1-index], 1.6, {
				// z: -500,
				scale:0.6,
				opacity:0,
				ease:  Power4.easeOut
			});
		});
	});
});

