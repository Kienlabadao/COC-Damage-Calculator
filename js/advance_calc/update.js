function updateDefense(element) {
    const defenseDiv = getParentDiv(element, "defense");

    if (defenseDiv) {
        const levelNumberSpan = defenseDiv.querySelector(".level");
        const defenseID = getDataTitle(defenseDiv);
        const defense = defenseListManager.getDefense(defenseID);
        const key = LocalStorageUtils.getObjectKey(type, "defense", defenseID);
       
        const currentLevelPos = Number.parseInt(element.value);       
        defense.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);
        const imagePath = defense.getImagePath();
        
        levelNumberSpan.textContent = defense.getCurrentLevel();
        if (defense.isMaxLevel()) {
            levelNumberSpan.classList.add("maxed-text");
        } else {
            levelNumberSpan.classList.remove("maxed-text");
        }
        defenseDiv.querySelector(".image").src = imagePath;
        defenseDiv.querySelector(".hp").textContent = defense.getCurrentHP();   
    }
    // calcDefense(defenseDiv);
}

function updateOffense(element) {
    const offenseDiv = getParentDiv(element, "offense");
    
    if (offenseDiv) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
        const offenseID = getDataTitle(offenseDiv);
        const offense = offenseListManager.getOffense(offenseID);
        const key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);       
        const currentLevelPos = Number.parseInt(element.value);

        offense.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);        
        if (offense.isMaxLevel()) {
            addMaxedClass(overlayDiv);
        } else {
            addNotMaxedClass(overlayDiv);
        }
        offenseDiv.querySelector(".level-number").textContent = offense.getCurrentLevel();
        offenseDiv.querySelector(".image").src = offense.getImagePath();
    }
    updateOverlay();
}

function toggleUseModifer(element) {
    const modifierDiv = getParentDiv(element, "modifier");
    const modifierID = getDataTitle(modifierDiv);
    const useModifier = element.checked;
    const useModifierKey = LocalStorageUtils.getUseModifierKey(type, modifierID);
    const modifier = offenseListManager.getModifier(modifierID);

    LocalStorageUtils.saveBoolean(useModifierKey, useModifier);
    modifier.isActive = useModifier;

    updateOverlay();
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
    const troopID = getDataTitle(troopDiv);
    const troop = offenseListManager.getTroop(troopID);
    const modifierListManager = new ModifierListManager;
    modifierListManager.loadModifier(offenseListManager.getModifierList());
    const troopModifierListManager = modifierListManager.getActiveTroopModifierListManager();
    const overlayDiv = troopDiv.querySelector(".overlay-top-left");
    removeAllChilds(overlayDiv);
    clearDataTitle(overlayDiv);

    if (useTroopDeathDamage && troop.canDealDeathDamage()) {
        const overlayImage = createOverlayImage(deathDamageImage);
        overlayImage.className = 'overlay-image death';
        setDataTitle(overlayDiv, "death_damage");

        overlayDiv.appendChild(overlayImage);
    } else if (!troopModifierListManager.isEmpty()) {
        const modifier = troopModifierListManager.getHighestModifier();

        const overlayImage = createOverlayImage(modifier.getImagePath());
        overlayImage.className = 'overlay-image raged';
        setDataTitle(overlayDiv, modifier.offenseID);

        overlayDiv.appendChild(overlayImage);
    }
}

function updateRepairDivOverlay(repairDiv) {
    const modifierListManager = new ModifierListManager;
    modifierListManager.loadModifier(offenseListManager.getModifierList());
    const repairModifierListManager = modifierListManager.getActiveRepairModifierListManager();
    const overlayDiv = repairDiv.querySelector(".overlay-top-left");
    removeAllChilds(overlayDiv);
    clearDataTitle(overlayDiv);

    if (!repairModifierListManager.isEmpty()) {
        const modifier = repairModifierListManager.getHighestModifier();

        const overlayImage = createOverlayImage(modifier.getImagePath());
        overlayImage.className = 'overlay-image raged';
        setDataTitle(overlayDiv, modifier.offenseID);

        overlayDiv.appendChild(overlayImage);
    }
}

function addAction(element) {
    const amount = Number.parseInt(element.value);
    const offenseDiv = getParentDiv(element, "offense");
    const offenseID = getDataTitle(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);
    const modifierOverlayDiv = offenseDiv.querySelector(".modifier");

    if (modifierOverlayDiv !== null) {
        const modifierID = getDataTitle(modifierOverlayDiv);

        if (modifierID.length !== 0 && modifierID !== "death") {
            const modifier = offenseListManager.getModifier(modifierID);
    
            addActionList(amount, offense, modifier);          
        } else {
            addActionList(amount, offense);        
        }
    } else {
        addActionList(amount, offense);
    }
    updateActionListDiv();
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
}

function addActionList(amount, offense, modifier = null) {
    for (let count = 0; count < amount; count++) {
        actionListManager.add(new Action(offense.clone(), modifier !== null ? modifier.clone() : null));
    }
}

function updateActionListDiv() {
    removeAllChilds(actionListDiv);
    
    let count = 0;
    for (const action of actionListManager.actionList) {
        actionListDiv.appendChild(createActionDiv(action, ++count));
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

    hideDiv(showActionListButton);
    hideDiv(showActionList);
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

    showDiv(showActionListButton);
    showDiv(showActionList);
}