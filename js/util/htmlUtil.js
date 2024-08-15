function addMaxedClass(overlayDiv) {
    overlayDiv.classList.remove("not-maxed");
    overlayDiv.classList.add("maxed");
}

function addNotMaxedClass(overlayDiv) {
    overlayDiv.classList.remove("maxed");
    overlayDiv.classList.add("not-maxed");
}

function isHidden(div) {
    return div.classList.contains("d-none");
}

function showDiv(div) {
    div.classList.remove("d-none");
}

function hideDiv(div) {
    div.classList.add("d-none");
}

function getDataTitle(dataDiv) {
    return getDataString(dataDiv, "data-title");
}

function getDataDonated(dataDiv) {
    return getDataBoolean(dataDiv, "data-donated");
}

function getDataString(dataDiv, attribute) {
    return dataDiv.getAttribute(attribute);
}

function getDataBoolean(dataDiv, attribute) {
    const boolean = dataDiv.getAttribute(attribute);
    if (boolean === "true" || boolean === "false") {
        return boolean  === "true";
    } else {
        throw new Error(`Invalid boolean dataDiv: ${boolean}`);
    }
}

function removeAllChilds(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    return div;
}

function appendAllChilds(div, nodeArray) {
    if (Array.isArray(nodeArray)) {
        for (const node of nodeArray) {
            div.appendChild(node.cloneNode(true));
        }
    } else {
        throw new Error(`Invalid nodeArray: ${nodeArray}`);
    }   
}

function getParentDiv(childDiv, parentDivClass) {
    do {
        if(childDiv.classList.contains(parentDivClass)){
            break;
        } else {
            childDiv = childDiv.parentNode;
        }
    } while (childDiv != null);
    return childDiv;
}