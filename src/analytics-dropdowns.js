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

function openDropdown(sect, content) {
    sect.classList.add("active");
    sect.appendChild(content);
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return makeEaseOut(quad)(timeFraction);
        },
        draw(progress) {
            sect.style.height = content.offsetHeight * progress + "px";
        },
        duration: 200
    });
}

function adjustDropdown(sect, content) {
    sect.replaceChild(content, sect.firstChild);
    const oldHeight = sect.offsetHeight;
    const heightDiff = content.offsetHeight - oldHeight;
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return makeEaseOut(quad)(timeFraction);
        },
        draw(progress) {
            sect.style.height = oldHeight + heightDiff * progress + "px";
        },
        duration: 200
    });
}

function closeDropdown(sect) {
    sect.classList.remove("active");
    sect.removeChild(sect.firstChild);
    const oldHeight = sect.offsetHeight;
    sect.currHeightAnim = animate({
        timing(timeFraction) {
            return makeEaseOut(quad)(timeFraction);
        },
        draw(progress) {
            sect.style.height = oldHeight - oldHeight * progress + "px";
        },
        duration: 200
    });
}