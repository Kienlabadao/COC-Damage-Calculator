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

function getDataDefenseStatus(dataDiv) {
    return getDataBoolean(dataDiv, "data-defense-status");
}

function getDataString(dataDiv, attribute) {
    return dataDiv.getAttribute(attribute);
}

function setDataTitle(dataDiv, value) {
    return setDataString(dataDiv, "data-title", value);
}

function setDataDonated(dataDiv, value) {
    return setDataString(dataDiv, "data-donated", value);
}

function setDataDefenseStatus(dataDiv, value) {
    return setDataString(dataDiv, "data-defense-status", value);
}

function clearDataTitle(dataDiv) {
    return setDataString(dataDiv, "data-title", "");
}

function clearDataDonated(dataDiv) {
    return setDataString(dataDiv, "data-donated", "");
}

function clearDataDefenseStatus(dataDiv) {
    return setDataString(dataDiv, "data-defense-status", "");
}

function setDataString(dataDiv, attribute, value) {
    return dataDiv.setAttribute(attribute, value);
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