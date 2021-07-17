function showAnalytics(event) {
    let btn = event.target;
    let activeButtonClass = "btn analytics-btn active";

    if (btn.className == activeButtonClass) {
        btn.sect.classList.remove("active");
        btn.parentNode.replaceChild(makeAnalyticsButton(btn.innerHTML, btn.sect), btn);
    }
    else {
        let elems = btn.parentNode.childNodes;
        let delayDropdown = false;
        
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].className == activeButtonClass) {
                delayDropdown = true;
                elems[i].sect.classList.remove("active");
                elems[i].parentNode.replaceChild(makeAnalyticsButton(elems[i].innerHTML, elems[i].sect), elems[i]);
            }
        }
        
        if (delayDropdown) {
            setTimeout(function() {dropDown(btn, activeButtonClass)}, 200);
        }
        else {
            dropDown(btn, activeButtonClass);
        }
    }
}

function dropDown(btn, activeButtonClass) {
    btn.sect.classList.add("active");
    btn.parentNode.replaceChild(makeAnalyticsButton(btn.innerHTML, btn.sect, activeButtonClass), btn);
}