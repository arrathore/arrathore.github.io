fetch("badges.html")
	.then(response => response.text())
	.then(html => {
	const container = document.getElementById("badge-container");

	container.innerHTML = html + html;
	});