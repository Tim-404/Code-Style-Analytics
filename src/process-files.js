/**
 * Counts the number of files attached to the file input.
 * @param {HTMLInputElement} elem the file input
 */
function countFiles(elem) {
    const label = elem.parentNode;
    const numFiles = elem.files.length;
    const labelSuffix = numFiles == 1 ? " file selected" : " files selected";
    label.removeChild(label.lastChild);
    label.appendChild(document.createTextNode(numFiles + labelSuffix));
}

/**
 * Creates a div element for each file which contains the filename and options for code analytics,
 * including stray literal search, indentation checking, and variable name lists.
 */
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
    }
}

/**
 * Creates a button with a two div elements attached. One references the space for the code analysis.
 * The other references the content of the analysis.
 * @param {string} sectionName the name of the code analysis
 * @param {HTMLDivElement} sect the attached analysis space
 * @param {HTMLDivElement} sectContent  the attached analysis content
 * @param {string} className the class of the button
 * @returns the button that will open/close the attached code analysis
 */
function makeAnalyticsButton(sectionName, sect, sectContent, className="btn analytics-btn") {
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(sectionName));
    button.className = className;
    button.sect = sect;
    button.sectContent = sectContent;
    button.addEventListener("click", showAnalytics);
    return button;
}

/**
 * Stores the stray literal analysis of the code inside a div element.
 * @param {File} file the source code
 * @returns a div element with a stray literal analysis of the code
 */
function findStrayLiterals(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-sl"));
    container.style.padding = "10px";
    return container;
}

/**
 * Stores the indentation analysis of the code inside a div element.
 * @param {File} file the source code
 * @returns a div element with an indentation analysis of the code
 */
function findIndentation(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-in"));
    container.style.padding = "10px";
    return container;
}

/**
 * Stores a list of variable names in the code inside a div element.
 * @param {File} file the source code
 * @returns a div element with a list of the variable names in the code
 */
function findVarNames(file) {
    const container = document.createElement("div");
    container.appendChild(document.createTextNode("filler for " + file.name + "-vn"));
    container.style.padding = "10px";
    return container;
}