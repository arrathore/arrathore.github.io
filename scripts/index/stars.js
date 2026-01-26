const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// queue to spawn stars
let stars = [];
const numStars = 300;

// queue to spawn star trails
let fade = [];

// colors
const starColor = 'rgb(229, 220, 222)';
const trailColor = 'rgb(21, 90, 224)';
const canvasDark = '#010118';
const canvasLight = 'white';

// randomly generates stars
function initStars() {
    stars = [];

    // put the stars at random positions and give them random speeds
    // stars start invisible and fade in at random speed
    for (let i = 0; i < numStars; i++) {
	let trail = i % 10 == 0 ? true : false;
	let star = {
	    x: Math.random() * canvas.width,
	    y: Math.random() * canvas.height, 
	    radius: Math.random() * 1.5,
	    speed: trail ? 1.0 + Math.random() * .05 : 0.2 + Math.random() * 0.5,
	    opacity: 0,
	    fadeSpeed: 0.001 + Math.random() * .001,
	    color: starColor,
	    hasTrail: trail
	};

	stars.push(star);
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function rgbToRgba(rgb, alpha) {
    return rgb.replace(/^rgb\(([^)]+)\)$/, `rgba($1, ${alpha})`);
}

function drawStars(delta) {
    ctx.fillStyle = site_globals.light_mode ? canvasLight : canvasDark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // if the user wants moving stars
    if (index_globals.stars_active) {
	for (const star of stars) {
	    ctx.beginPath();
	    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
	    
	    // if not fully visible, increase opacity
	    if (star.opacity < 1) {
		star.opacity = Math.min(star.opacity + star.fadeSpeed, 1);
	    }
	    ctx.fillStyle = !site_globals.light_mode ? /*`rgba(255, 255, 255, ${star.opacity})`*/ rgbToRgba(star.color, star.opacity) :
		`rgba(100, 100, 255, ${star.opacity})`;
	    ctx.fill();

	    
	    // trail effect
	    if (star.hasTrail) {
		fade.push({ // spawn fade
		    x: star.x,
		    y: star.y, 
		    radius: star.radius * .5,
		    speed: 0,
		    opacity: star.opacity * .9,
		    fadeSpeed: star.fadeSpeed * Math.random() * 10,
		    color: trailColor
		});
		// console.log("added a fade");
	    }

	    
	    // move star
	    if (!star.hasTrail)
		star.y += star.speed * delta * .04;
	    else
		star.y += star.speed * delta * .01;
	    star.x += star.speed * delta * .04;

	    // if we fall off the bottom
	    if (star.y > canvas.height) {
		// bring the star back up
		star.y = 0;
		star.x = Math.random() * canvas.width;
	    }

	    // or the side
	    if (star.x > canvas.width) {
		// bring the star to the other side
		star.x = 0;
		star.y = Math.random() * canvas.height;
	    }
	}

	for (const star of fade) {
	    ctx.beginPath();
	    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

	    // fade out
	    if (star.opacity > 0) star.opacity = Math.max(star.opacity - star.fadeSpeed, 0)

	    ctx.fillStyle = !site_globals.light_mode ? /*`rgba(255, 255, 255, ${star.opacity})`*/ rgbToRgba(star.color, star.opacity) :
		`rgba(100, 100, 255, ${star.opacity})`;
	    ctx.fill();
	}

	// clear fade
	fade = fade.filter(s => s.opacity > 0);
	while (fade.length > stars.length * 7)
	    fade.splice(Math.floor(Math.random() * fade.length), 1);
    }
}

let lastTime = 0;
function animate(time) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;
    drawStars(delta);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(animate);
