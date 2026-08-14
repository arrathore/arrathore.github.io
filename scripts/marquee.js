(() => {
    const container = document.querySelector(".marquee-container");
    const track = document.querySelector(".marquee-track");
    const original = document.querySelector(".marquee-group");

    if (!container || !track || !original) {
        return;
    }

    // remove previously generated copies
    track.querySelectorAll(".marquee-group:not(:first-child)")
        .forEach(group => group.remove());

    // duplicate group twice so there are 3 total groups for a seamless infinite loop
    for (let i = 0; i < 2; i++) {
        const copy = original.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        track.appendChild(copy);
    }
})();
