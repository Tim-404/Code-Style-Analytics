/**
 * Takes a button click event and determines which code analyses to show/hide.
 * @param {Event} event - The button click event
 */
function showAnalytics(event) {
    const btn = event.target;
    const activeButtonClass = "btn analytics-btn active";

    // TODO: add animation cancellations

    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        closeDropdown(btn);
    }
    else {
        const elems = btn.parentNode.childNodes;
        let changeText = false;
        
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].className == activeButtonClass) {
                changeText = true;
                elems[i].classList.remove("active");
            }
        }
        
        btn.classList.add("active");
        if (changeText) {
            adjustDropdown(btn);
        }
        else {
            openDropdown(btn);
        }
    }
}

/**
 * Opens a new section under an analysis entry.
 * @param {HTMLButtonElement} btn - The button that holds the section data
 */
function openDropdown(btn) {
    btn.sect.classList.add("active");
    btn.sect.appendChild(content);
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            btn.sect.style.height = btn.content.offsetHeight * progress + "px";
        },
        duration: 200
    },
    btn.sectAnim);
}

/**
 * Adjusts an existing section under an analysis entry.
 * @param {HTMLButtonElement} btn - The button that holds the section data
 */
function adjustDropdown(btn) {
    // Old text fade out
    const oldOpacity = btn.content.style.opacity;
    hideText = new CustomAnimation(
        linear,
        (progress) => btn.sect.firstChild.style.opacity = oldOpacity * (1 - progress),
        200
    );

    // New text fade in
    showText = new CustomAnimation(
        linear,
        (progress) => btn.sect.firstChilde.style.opacity = progress,
        200
    );
    animate([hideText, showText], btn.textAnim);

    // Switch out text content
    setTimeout(
        () => {
            btn.sect.replaceChild(btn.content, btn.sect.firstChild);
            btn.sect.firstChild.style.opacity = 0;
        },
        200
    );

    // Animate height of the section
    const oldHeight = btn.sect.offsetHeight;
    const heightDiff = btn.content.offsetHeight - oldHeight;
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            btn.sect.style.height = oldHeight + heightDiff * progress + "px";
        },
        duration: 200
    },
    btn.sectAnim);
}

/**
 * Closes an existing section under an analysis entry.
 * @param {HTMLButtonElement} btn - The button that holds the section data
 */
function closeDropdown(btn) {
    btn.sect.classList.remove("active");
    btn.sect.removeChild(sect.firstChild);
    const oldHeight = btn.sect.offsetHeight;
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            btn.sect.style.height = oldHeight - oldHeight * progress + "px";
        },
        duration: 200
    },
    btn.sectAnim);
}