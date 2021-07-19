/**
 * Takes a button click event and determines which code analyses to show/hide.
 * @param {Event} event the button click event
 */
function showAnalytics(event) {
    const btn = event.target;
    const activeButtonClass = "btn analytics-btn active";

    // TODO: redo this for the revised file entry structure
    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        closeDropdown(btn.sect);
    }
    else {
        let elems = btn.parentNode.childNodes;
        let delayDropdown = false;
        
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].className == activeButtonClass) {
                delayDropdown = true;
                elems[i].classList.remove("active");
            }
        }
        
        btn.classList.add("active");
        if (delayDropdown) {
            adjustDropdown(btn.sect, btn.sectContent);
        }
        else {
            openDropdown(btn.sect, btn.sectContent);
        }
    }
}

/**
 * Opens a new section under an analysis entry.
 * @param {HTMLDivElement} sect the analysis space
 * @param {HTMLDivElement} content the analysis content
 */
function openDropdown(sect, content) {
    sect.classList.add("active");
    sect.appendChild(content);
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            sect.style.height = content.offsetHeight * progress + "px";
        },
        duration: 200
    });
}

/**
 * Adjusts an existing section under an analysis entry.
 * @param {HTMLDivElement} sect the analysis space
 * @param {HTMLDivElement} content the analysis content
 */
function adjustDropdown(sect, content) {
    sect.replaceChild(content, sect.firstChild);
    const oldHeight = sect.offsetHeight;
    const heightDiff = content.offsetHeight - oldHeight;
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            sect.style.height = oldHeight + heightDiff * progress + "px";
        },
        duration: 200
    });
}

/**
 * Closes an existing section under an analysis entry.
 * @param {HTMLDivElement} sect the analysis space
 */
function closeDropdown(sect) {
    sect.classList.remove("active");
    sect.removeChild(sect.firstChild);
    const oldHeight = sect.offsetHeight;
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return reverseTiming(quadratic)(timeFraction);
        },
        draw(progress) {
            sect.style.height = oldHeight - oldHeight * progress + "px";
        },
        duration: 200
    });
}