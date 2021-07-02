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
        analyticsContainer.appendChild(makeAnalyticsButton("Stray Literals"));
        analyticsContainer.appendChild(makeAnalyticsButton("Indentation"));
        analyticsContainer.appendChild(makeAnalyticsButton("Variable Names"));
        analyticsContainer.appendChild(makeAnalyticsSection(files[i].name + "-sl"));
        analyticsContainer.appendChild(makeAnalyticsSection(files[i].name + "-i"));
        analyticsContainer.appendChild(makeAnalyticsSection(files[i].name + "-vn"));
    }
}

function makeAnalyticsButton(sectionName) {
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(sectionName));
    button.className = "analytics-button";
    button.onclick = "showAnalytics()";
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