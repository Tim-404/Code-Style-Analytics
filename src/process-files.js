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
        analyticsContainer.className = "analytics-content";
        const slBtn = makeAnalyticsButton("Stray Literals", analyticsContainer, findStrayLiterals(files[i]));
        const inBtn = makeAnalyticsButton("Indentation", analyticsContainer, findIndentation(files[i]));
        const vnBtn = makeAnalyticsButton("Variable Names", analyticsContainer, findVarNames(files[i]));
        entryHeader.appendChild(slBtn);
        entryHeader.appendChild(inBtn);
        entryHeader.appendChild(vnBtn);

        entryContainer.appendChild(analyticsContainer);

        const script = document.createElement("script");
        script.src = "analytics-dropdowns.js";
    }
}

function makeAnalyticsButton(sectionName, sect, sectContent, className="btn analytics-btn") {
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(sectionName));
    button.className = className;
    button.sect = sect;
    button.sectContent = sectContent;
    button.addEventListener("click", showAnalytics);
    return button;
}

function findStrayLiterals(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-sl"));
    container.style.padding = "10px";
    return container;
}

function findIndentation(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-in"));
    container.style.padding = "10px";
    return container;
}

function findVarNames(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-vn"));
    container.style.padding = "10px";
    return container;
}