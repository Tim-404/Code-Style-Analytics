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
        const entryHeader = document.createElement("div");
        entryHeader.appendChild(entryNameContainer)
        entryContainer.appendChild(entryHeader);
        entryHeader.style.borderBottom = "1px solid #555";
        entryHeader.style.marginBottom = "-1px";

        const analyticsContainer = document.createElement("div");
        const slSect = makeAnalyticsSection(files[i].name + "-sl");
        const inSect = makeAnalyticsSection(files[i].name + "-in");
        const vnSect = makeAnalyticsSection(files[i].name + "-vn");
        const slBtn = makeAnalyticsButton("Stray Literals", slSect);
        const inBtn = makeAnalyticsButton("Indentation", inSect);
        const vnBtn = makeAnalyticsButton("Variable Names", vnSect);
        entryHeader.appendChild(slBtn);
        entryHeader.appendChild(inBtn);
        entryHeader.appendChild(vnBtn);
        analyticsContainer.appendChild(slSect);
        analyticsContainer.appendChild(inSect);
        analyticsContainer.appendChild(vnSect);

        entryContainer.appendChild(analyticsContainer);

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
    const textContainer = document.createElement("div");
    const text = document.createTextNode("filler for " + name);
    textContainer.style.padding = "10px";
    textContainer.appendChild(text);
    analytics.appendChild(textContainer);
    return analytics;
}