// navigation and view interaction
document.querySelectorAll('#links a[data-page]').forEach(link => {
    link.addEventListener('click', async (e) => {
	e.preventDefault();

	const page = link.getAttribute('data-page');

	try {
	    const response = await fetch(page);
	    const html = await response.text();

	    document.getElementById('view').innerHTML = `
<p class="box-title">view</p>
        <hr />
        ${html}
`;
	} catch (err) {
	    document.getElementById('view').innerHTML = `
<p class="box-title">view</p>
<hr />
<p>Error loading content</p>
`;
	}
    });
});

