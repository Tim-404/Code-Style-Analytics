/**
 * Takes a button click event and determines which code analyses to show/hide.
 * @param {Event} event - The button click event
 */
function showAnalytics(event) {
    const btn = event.target;
    const activeButtonClass = "btn analytics-btn active";

    // Cancel current animations on the targeted space
    const target = btn.sectWrapper;
    if (target.sectAnim.id != 0) {
        cancelAnimationFrame(target.sectAnim.id);
        target.sectAnim.id = 0;
    }
    if (target.textAnim.id != 0) {
        cancelAnimationFrame(target.textAnim.id);
        target.textAnim.id = 0;
    }

    // Animate the change in text and box size
    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        closeDropdown(btn.sectWrapper);
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
            adjustDropdown(btn.sectWrapper);
        }
        else {
            openDropdown(btn.sectWrapper);
        }
    }
}

/**
 * Opens a new section under an analysis entry.
 * @param {Object} wrapper - The object that holds the section data
 */
function openDropdown(wrapper) {
    if (wrapper.sect.hasChildNodes()) {
    	wrapper.sect.replaceChild(wrapper.sectContent, wrapper.sect.firstChild);
    }
    else {
    	wrapper.sect.appendChild(wrapper.sectContent);
    }
    wrapper.sect.firstChild.style.opacity = 1;
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            wrapper.sect.style.height = wrapper.sectContent.offsetHeight * progress + "px";
        },
        duration: 300
    },
    wrapper.sectAnim);
}

/**
 * Adjusts an existing section under an analysis entry.
 * @param {Object} wrapper - The button that holds the new section data
 */
function adjustDropdown(wrapper) {
    // Animate height of the section
    const oldHeight = wrapper.sect.offsetHeight;
    const temp = wrapper.sect.firstChild;
    wrapper.sect.replaceChild(wrapper.sectContent, wrapper.sect.firstChild);
    wrapper.sect.style.height = "auto";
    const heightDiff = wrapper.sect.offsetHeight - oldHeight;
    wrapper.sect.replaceChild(temp, wrapper.sect.firstChild);
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            wrapper.sect.style.height = oldHeight + heightDiff * progress + "px";
        },
        duration: 300
    },
    wrapper.sectAnim);

    // Old text fade out
    const oldOpacity = wrapper.sect.firstChild.style.opacity;
    const oldStyle = wrapper.sect.firstChild.style;
    hideText = new CustomAnimation(
        linear,
        (progress) => oldStyle.opacity = oldOpacity * (1 - progress),
        300
    );

    // New text fade in
    const newStyle = wrapper.sectContent.style;
    showText = new CustomAnimation(
        linear,
        (progress) => newStyle.opacity = progress,
        300
    );
    animateMany([hideText, showText], wrapper.textAnim);

    // Switch out text content
    setTimeout(
        () => {
            wrapper.sect.firstChild.style.opacity = 1;
            wrapper.sect.replaceChild(wrapper.sectContent, wrapper.sect.firstChild);
            wrapper.sect.firstChild.style.opacity = 0;
        },
        300
    );
}

/**
 * Closes an existing section under an analysis entry.
 * @param {Object} wrapper - The button that holds the section data
 */
function closeDropdown(wrapper) {
    const oldHeight = wrapper.sect.offsetHeight;
    animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            wrapper.sect.style.height = oldHeight - oldHeight * progress + "px";
        },
        duration: 300
    },
    wrapper.sectAnim);
}