function showAnalytics(event) {
    let btn = event.target;
    let activeButtonClass = "btn analytics-btn active";

    if (btn.className == activeButtonClass) {
        btn.sect.style.display = "none";
        btn.parentNode.replaceChild(makeAnalyticsButton(btn.innerHTML, btn.sect), btn);
    }
    else {
        let elems = btn.parentNode.childNodes;
        
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].className == activeButtonClass) {
                elems[i].sect.style.display = "none";
                elems[i].parentNode.replaceChild(makeAnalyticsButton(elems[i].innerHTML, elems[i].sect), elems[i]);
            }
        }
        
        btn.sect.style.display = "block";
        btn.parentNode.replaceChild(makeAnalyticsButton(btn.innerHTML, btn.sect, activeButtonClass), btn);
    }
}

function animateDropdown(sect) {

}

function animateDrawup(sect) {

}