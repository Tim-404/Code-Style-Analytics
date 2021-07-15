function countFiles(elem) {
    const label = elem.parentNode;
    const numFiles = elem.files.length;
    const labelSuffix = numFiles == 1 ? " file selected" : " files selected";
    label.removeChild(label.lastChild);
    label.appendChild(document.createTextNode(numFiles + labelSuffix));
}

function processFiles() {
    const files = document.getElementById("codefiles").files;
    if (files.length == 0) return;

    const listNode = document.getElementById("results");
    while (listNode.firstChild) {
        listNode.removeChild(listNode.lastChild);
    }

    for (let i = 0; i < files.length; ++i) {
        const entryContainer = document.createElement("div");
        entryContainer.className = "analytics-entry";
        listNode.appendChild(entryContainer);

        const entryNameContainer = document.createElement("h2");
        entryNameContainer.appendChild(document.createTextNode(files[i].name));
        entryNameContainer.className = "entry-header";
        entryContainer.appendChild(entryNameContainer);

        const analyticsContainer = document.createElement("div");
        entryContainer.appendChild(analyticsContainer);
        const slSect = makeAnalyticsSection(files[i].name + "-sl");
        const inSect = makeAnalyticsSection(files[i].name + "-in");
        const vnSect = makeAnalyticsSection(files[i].name + "-vn");
        const slBtn = makeAnalyticsButton("Stray Literals", slSect);
        const inBtn = makeAnalyticsButton("Indentation", inSect);
        const vnBtn = makeAnalyticsButton("Variable Names", vnSect);
        analyticsContainer.appendChild(slBtn);
        analyticsContainer.appendChild(inBtn);
        analyticsContainer.appendChild(vnBtn);
        analyticsContainer.appendChild(slSect);
        analyticsContainer.appendChild(inSect);
        analyticsContainer.appendChild(vnSect);

        const script = document.createElement("script");
        script.src = "analytics-dropdowns.js";
    }
}

function makeAnalyticsButton(sectionName, sect, className="btn analytics-btn") {
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(sectionName));
    button.className = className;
    button.sect = sect;
    button.addEventListener("click", showAnalytics);
    return button;
}

function makeAnalyticsSection(name) {
    const analytics = document.createElement("div");
    // TODO: replace filler with the actual analytics
    analytics.className = "analytics-content";
    analytics.id = name;
    analytics.appendChild(document.createTextNode("filler for " + name));
    return analytics;
}