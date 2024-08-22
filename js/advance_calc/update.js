function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");
    const tableHeader = defenseDiv.querySelector("thead");
    const damageLogDefenseHeader = tableHeader.querySelector(".damageLogDefenseHeader");

    if (defenseDiv) {
        const levelNumberSpan = defenseDiv.querySelector(".level");
        const defenseID = HTMLUtil.getDataID(defenseDiv);
        const defense = defenseListManager.getDefense(defenseID);
        const key = LocalStorageUtils.getObjectKey(type, "defense", defenseID);
       
        const currentLevelPos = Number.parseInt(element.value);       
        defense.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);
        const imagePath = defense.getImagePath();
        
        levelNumberSpan.textContent = defense.getCurrentLevel();
        if (defense.isMaxLevel()) {
            levelNumberSpan.classList.add("text--level-maxed");
        } else {
            levelNumberSpan.classList.remove("text--level-maxed");
        }
        defenseDiv.querySelector(".image--main").src = imagePath;
        defenseDiv.querySelector(".hp").textContent = defense.getCurrentMaxHP();

        if (damageLogDefenseHeader) {
            HTMLUtil.removeChild(tableHeader, ".damageLogDefenseHeader");
            tableHeader.appendChild(AdvanceHTMLUtil.createDamageLogDefenseHeader(defense));
        }
        calcDefense(defenseDiv);
    } else {
        throw new Error(`Invalid defense div: ${defenseDiv}`);
    }
}

function updateOffense(element) {
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");
    
    if (offenseDiv) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
        const offenseID = HTMLUtil.getDataID(offenseDiv);
        const offense = offenseListManager.getOffense(offenseID);
        const key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);       
        const currentLevelPos = Number.parseInt(element.value);

        offense.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);        
        if (offense.isMaxLevel()) {
            HTMLUtil.addMaxedClass(overlayDiv);
        } else {
            HTMLUtil.addNotMaxedClass(overlayDiv);
        }
        offenseDiv.querySelector(".level").textContent = offense.getCurrentLevel();
        offenseDiv.querySelector(".image").src = offense.getImagePath();
    }
}

function updateModifier(element) {
    const modifierDiv = HTMLUtil.getParentDiv(element, "modifier");
    
    if (modifierDiv) {
        const overlayDiv = modifierDiv.querySelector(".overlay");
        const modifierID = HTMLUtil.getDataID(modifierDiv);
        const modifier = modifierListManager.getModifier(modifierID);
        const key = LocalStorageUtils.getObjectKey(type, "offense", modifierID);       
        const currentLevelPos = Number.parseInt(element.value);

        modifier.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);
        if (modifier.isMaxLevel()) {
            HTMLUtil.addMaxedClass(overlayDiv);
        } else {
            HTMLUtil.addNotMaxedClass(overlayDiv);
        }
        modifierDiv.querySelector(".level").textContent = modifier.getCurrentLevel();
        modifierDiv.querySelector(".image").src = modifier.getImagePath();
    }
    updateOverlay();
}

function toggleUseModifer(element) {
    const modifierDiv = HTMLUtil.getParentDiv(element, "modifier");
    const modifierID = HTMLUtil.getDataID(modifierDiv);
    const useModifier = element.checked;
    const useModifierKey = LocalStorageUtils.getUseModifierKey(type, modifierID);
    const modifier = modifierListManager.getModifier(modifierID);

    LocalStorageUtils.saveBoolean(useModifierKey, useModifier);
    modifier.isActive = useModifier;

    updateOverlay();
}

function toggleHideDestroyedDefenses(element) {
    hideDestroyedDefenses = element.checked;
    LocalStorageUtils.saveBoolean(hideDestroyedDefensesKey, hideDestroyedDefenses);
    toggleDefenseDivVisibility();
}

function toggleUseTroopDeathDamage(element) {
    useTroopDeathDamage = element.checked;
    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseTroopDeathDamageKey(type), useTroopDeathDamage);

    for (const troop of offenseListManager.getTroopList()) {
        if (useTroopDeathDamage) {
            troop.damageMode = Troop.DEATH_DAMAGE;
        } else {
            troop.damageMode = Troop.DAMAGE;
        }
    }

    updateOverlay();
}

function updateOverlay() {
    for (const troopDiv of troopDivs) {
        updateTroopDivOverlay(troopDiv);
    }
    for (const repairDiv of repairDivs) {
        updateRepairDivOverlay(repairDiv);
    }
}

function updateTroopDivOverlay(troopDiv) {
    const troopID = HTMLUtil.getDataID(troopDiv);
    const troop = offenseListManager.getTroop(troopID);
    const troopModifierListManager = modifierListManager.getActiveTroopModifierListManager();
    const objectContainer = troopDiv.querySelector(".object-container");
    HTMLUtil.removeChild(objectContainer, ".modifier");

    if (useTroopDeathDamage && troop.canDealDeathDamage()) {
        const modifierOverlay = HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_DEATH);
        HTMLUtil.setDataID(modifierOverlay, "death_damage");

        objectContainer.appendChild(modifierOverlay);
    } else if (!troopModifierListManager.isEmpty()) {
        const modifier = troopModifierListManager.getHighestModifier();

        const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
        HTMLUtil.setDataID(modifierOverlay, modifier.offenseID);

        objectContainer.appendChild(modifierOverlay);
    }
}

function updateRepairDivOverlay(repairDiv) {
    const repairModifierListManager = modifierListManager.getActiveRepairModifierListManager();
    const objectContainer = repairDiv.querySelector(".object-container");
    HTMLUtil.removeChild(objectContainer, ".modifier");

    if (!repairModifierListManager.isEmpty()) {
        const modifier = repairModifierListManager.getHighestModifier();

        const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
        HTMLUtil.setDataID(modifierOverlay, modifier.offenseID);

        objectContainer.appendChild(modifierOverlay);
    }
}

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

function toggleDefenseDivVisibility() {
    const defensesDiv = defensesSection.querySelectorAll('.defense');
    
    if (hideDestroyedDefenses) {
        defensesDiv.forEach((defenseDiv) => {
            const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseDiv);

            if (isDestroyed) {
                HTMLUtil.hideDiv(defenseDiv);               
            } else {
                HTMLUtil.showDiv(defenseDiv);
            }
        });
    } else {
        defensesDiv.forEach((defenseDiv) => {
            HTMLUtil.showDiv(defenseDiv);
        });   
    }
    searchDefenses(searchDefenseBox);
}