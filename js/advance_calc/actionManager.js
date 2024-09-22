function addAction(element) {
    const amount = Number.parseInt(element.value);
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");

    if (offenseDiv !== null) {
        const offenseID = HTMLUtil.getDataID(offenseDiv);
        const offense = offenseListManager.getOffense(offenseID);

        addActionList(amount, offense);
        updateActionList();
        console.log(actionListManager);
        calc();
    } else {
        const equipmentDiv = HTMLUtil.getParentDiv(element, "equipment");
        
        if (equipmentDiv !== null) {
            const equipmentID = HTMLUtil.getDataID(equipmentDiv);
            const hero = offenseListManager.getHeroFromEquipment(equipmentID);
            hero.setActiveEquipment(equipmentID); 
            console.log(hero);
            addActionList(amount, hero);
            updateActionList();
            console.log(actionListManager);
            calc();
        } else {
            throw new Error(`Invalid action btn: ${element}`);
        }
    }
}

function addActionList(amount, offense) {
    for (let count = 0; count < amount; count++) {
        const actionListSize = actionListManager.getLength();

        if (actionListSize < actionListMaxSize) {
            actionListManager.add(new Action(offense.clone()));
            updateActionCount(actionListManager.getLength());
            if (!HTMLUtil.isDivHidden(statusLimitExceededDiv)) {
                setStatusLimitExceededDiv(false);
            }
        } else {
            setStatusLimitExceededDiv(true);
            break;
        }
    }
}

function removeAction(element) {
    const amount = element.value;

    if (amount === "all") {
        actionListManager.clear();
        hideActionList();
    } else {
        actionListManager.removeCount(Number.parseInt(amount));
        updateActionList();
    }

    if (!HTMLUtil.isDivHidden(statusLimitExceededDiv)) {
        setStatusLimitExceededDiv(false);
    }
    updateActionCount(actionListManager.getLength());
    calc();
}

function removeActionDetail(element) {
    const pos = Number.parseInt(element.value) - 1;
    
    actionListManager.removeItemAtIndex(pos);
    updateActionList();

    if (!HTMLUtil.isDivHidden(statusLimitExceededDiv)) {
        setStatusLimitExceededDiv(false);
    }
    updateActionCount(actionListManager.getLength());
    calc();
}

function moveActionUp(element) {
    const pos = Number.parseInt(element.value) - 1;
    
    actionListManager.swap(pos, pos - 1);
    updateActionList();

    if (!HTMLUtil.isDivHidden(statusLimitExceededDiv)) {
        setStatusLimitExceededDiv(false);
    }
    updateActionCount(actionListManager.getLength());
    calc();
}

function moveActionDown(element) {
    const pos = Number.parseInt(element.value) - 1;
    
    actionListManager.swap(pos, pos + 1);
    updateActionList();

    if (!HTMLUtil.isDivHidden(statusLimitExceededDiv)) {
        setStatusLimitExceededDiv(false);
    }
    updateActionCount(actionListManager.getLength());
    calc();
}

function updateActionList() {
    updateActionListDiv();
    updateActionListDetailDiv();
    
    if (actionListManager.isEmpty()) {
        hideActionList();
    } else {
        showActionList();
    }
}

function updateActionListDiv() {
    HTMLUtil.removeAllChilds(actionListDiv);
    
    let count = 0;
    for (const action of actionListManager.actionList) {
        actionListDiv.appendChild(AdvanceHTMLUtil.createActionDiv(action, ++count));
    }
}

function updateActionListDetailDiv() {
    const actionDisplay  = actionListDetailDiv.querySelector(".action-display");
    HTMLUtil.removeAllChilds(actionDisplay);

    let count = 0;
    const totalAction = actionListManager.getLength();
    for (const action of actionListManager.actionList) {
        actionDisplay.appendChild(AdvanceHTMLUtil.createActionDetailRow(action, ++count, totalAction));
    }
}

function updateActionCount(actionListSize) {
    if (NumberUtil.isNumber(actionListSize)) {
        if (actionListSize < 2) {
            actionCountBox.textContent = `Action Count: ${actionListSize}/${actionListMaxSize}`;
        } else {
            actionCountBox.textContent = `Actions Count: ${actionListSize}/${actionListMaxSize}`;
        }
    } else {
        throw new TypeError(`Invalid actionListSize: ${actionListSize}`);
    }
}

function setStatusLimitExceededDiv(status) {
    if (typeof status === "boolean") {
        const statusText = statusLimitExceededDiv.querySelector(".info");

        if (status) {
            HTMLUtil.showDiv(statusLimitExceededDiv);
            HTMLUtil.setStatusTextFailed(statusText);
            statusText.textContent = "Action List's limit exceeded!";
        } else {
            HTMLUtil.hideDiv(statusLimitExceededDiv);
            statusText.textContent = "";
        }
    } else {
        throw new TypeError(`Invalid status: ${status}`);
    }
}

function toggleShowActionDetail(element) {
    showActionDetail = element.checked;
    LocalStorageUtils.saveBoolean(showActionDetailKey, showActionDetail);
    toggleShowActionListType();
}

function toggleShowActionListType() {
    if (showActionDetail) {
        HTMLUtil.showDiv(actionListDetailDiv);
        HTMLUtil.hideDiv(actionListDiv);
    } else {
        HTMLUtil.showDiv(actionListDiv);
        HTMLUtil.hideDiv(actionListDetailDiv);
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

    HTMLUtil.toggleBSCollapse(showActionList, true);

    HTMLUtil.showDiv(showActionListButton);
    HTMLUtil.showDiv(showActionList);
}