const lines = [
              "lean back on your radio",
              "well, i hope you come and see me in the movies",
              "slow down, you're gonna crash",
              "can you feel the sunshine?",
              "ding dong",
              "public static void",
              "how did you get here?"
              ];

// picks one of the taglines
function setTagline() {
    document.getElementById("tagline").innerHTML = lines[
        Math.floor(Math.random() * lines.length)
    ];
}

// desaturate a color by a given decimal percent
function desaturate(color, percent) {
    let avg = (color[0] + color[1] + color[2]) / 3.0;
    let ret = color.slice();
    for (let i = 0; i < 3; i++) {
	ret[i] = color[i] - ((color[i] - avg) * percent);
    }
    return ret;
}

// give the user configuration options
function setMode() {
    // let the user pick light or dark mode
/*    let displayButton = document.getElementById("display-toggle");
    displayButton.addEventListener("click", function () {
	// toggle light-dark behavior on mode-affected elements
	site_globals.light_mode = !site_globals.light_mode;
	let elements = document.getElementsByClassName("mode-affected");
	for (let element of elements) {
	    element.classList.toggle("light-mode");
	}

	// desaturate colorful elements (or re-saturate if going to dark)
	let colorfulElements = document.getElementsByClassName("colorful");
	for (let i = 0; i < colorfulElements.length; i++) {
	    console.log(colorfulElements[i].style.color);
	    console.log(nameToRgba(colorfulElements[i].style.color));
	    console.log(desaturate(nameToRgba(colorfulElements[i].style.color), .5));

	    if (site_globals.light_mode) {
		let rgba  = desaturate(nameToRgba(colorfulElements[i].style.color), .75);
		colorfulElements[i].style.color = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
	    } else {
		colorfulElements[i].style.color = colors[i];
	    }
	}
    });*/
    
    // let the user toggle star movement
    let starButton = document.getElementById("star-toggle");
    console.log(starButton);
    starButton.addEventListener("click", function () {
	index_globals.stars_active = !index_globals.stars_active;
	console.log(index_globals.stars_active);
    });
}

window.onload = function() {
    setTagline();
    setMode();
}
