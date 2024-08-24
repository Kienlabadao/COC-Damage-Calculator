function addAction(element) {
    const amount = Number.parseInt(element.value);
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);
    const modifierOverlayDiv = offenseDiv.querySelector(".modifier");

    if (modifierOverlayDiv !== null) {
        const modifierID = HTMLUtil.getDataID(modifierOverlayDiv);

        if (modifierID.length !== 0 && modifierID !== "death") {
            const modifier = modifierListManager.getModifier(modifierID);
    
            addActionList(amount, offense, modifier);     
        } else {
            addActionList(amount, offense);        
        }
    } else {
        addActionList(amount, offense);
    }
    updateActionListDiv();
    calc();
}

function removeAction(element) {
    const amount = element.value;

    if (amount === "all") {
        actionListManager.clear();
        hideActionList();
    } else {
        actionListManager.removeCount(Number.parseInt(amount));
        updateActionListDiv();
    }
    calc();
}

function addActionList(amount, offense, modifier = null) {
    for (let count = 0; count < amount; count++) {
        actionListManager.add(new Action(offense.clone(), modifier !== null ? modifier.clone() : null));
    }
}

function updateActionListDiv() {
    HTMLUtil.removeAllChilds(actionListDiv);
    
    let count = 0;
    for (const action of actionListManager.actionList) {
        actionListDiv.appendChild(AdvanceHTMLUtil.createActionDiv(action, ++count));
    }
    
    if (actionListManager.isEmpty()) {
        hideActionList();
    } else {
        showActionList();
    }
}

function hideActionList() {
    const showActionListButton = document.getElementById("showActionListButton");
    const showActionList = document.getElementById("showActionList");

    HTMLUtil.hideDiv(showActionListButton);
    HTMLUtil.hideDiv(showActionList);
}

function showActionList() {
    const showActionListButton = document.getElementById("showActionListButton");
    const button = showActionListButton.querySelector("button");
    button.textContent = "Hide";
    const showActionList = document.getElementById("showActionList");

    const collapse = new bootstrap.Collapse(showActionList, {
        toggle: false
    })
    collapse.show();

    HTMLUtil.showDiv(showActionListButton);
    HTMLUtil.showDiv(showActionList);
}