// Called when the slider level of defense is changed. Get the caller defense, its level to start update and recalculation
function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");
    const currentLevelPos = Number.parseInt(element.value);
    if (defenseDiv) {
        updateDefenseLevel(defenseDiv, currentLevelPos);
    } else {
        throw new Error(`Invalid defenseDiv: ${defenseDiv}`);
    }
    calcDefense(defenseDiv);
    filterDefenses();
}

// Update defense's stat, image
function updateDefenseLevel(defenseDiv, currentLevelPos) {
    const levelNumberSpan = defenseDiv.querySelector(".level");
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    const key = LocalStorageUtils.getObjectKey(type, "defense", defenseID);
        
    defense.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);
    const imagePath = defense.getImagePath();
    
    levelNumberSpan.textContent = defense.getCurrentLevel();
    if (defense.isMaxLevel()) {
        HTMLUtil.addTextMaxedClass(levelNumberSpan);
    } else {
        HTMLUtil.removeTextMaxedClass(levelNumberSpan);
    }
    defenseDiv.querySelector(".image--main").src = imagePath;
    defenseDiv.querySelector(".hp").textContent = defense.getCurrentMaxHP();

    const tableHeader = defenseDiv.querySelector("thead");
    const damageLogDefenseHeader = tableHeader.querySelector(".damageLogDefenseHeader");
    if (damageLogDefenseHeader) {
        HTMLUtil.removeChild(tableHeader, ".damageLogDefenseHeader");
        tableHeader.appendChild(AdvanceHTMLUtil.createDamageLogDefenseHeader(defense));
    }
}

// Called when the slider level of offense is changed. Get the caller offense, its level to start update and recalculation
function updateOffense(element) {
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");
    const currentLevelPos = Number.parseInt(element.value);    
    
    if (offenseDiv) {
        updateOffenseLevel(offenseDiv, currentLevelPos)
    } else {
        throw new Error(`Invalid offenseDiv: ${offenseDiv}`);
    }       
    calc();
}

// Update offense's stat and image
function updateOffenseLevel(offenseDiv, currentLevelPos) {
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);
    const key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);       

    offense.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);   
    const overlayDiv = offenseDiv.querySelector(".overlay");     
    if (offense.isMaxLevel()) {
        HTMLUtil.addLevelOverlayMaxedClass(overlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(overlayDiv);
    }
    offenseDiv.querySelector(".level").textContent = offense.getCurrentLevel();
    offenseDiv.querySelector(".image").src = offense.getImagePath();
}

// Called when the slider level of modifier is changed. Get the caller modifier, its level to start update itself and and related offense overlay
function updateModifier(element) {
    const modifierDiv = HTMLUtil.getParentDiv(element, "modifier");
    const currentLevelPos = Number.parseInt(element.value);
    
    if (modifierDiv) {
        updateModifierLevel(modifierDiv, currentLevelPos);
    } else {
        throw new Error(`Invalid modifierDiv: ${modifierDiv}`);
    }
    updateOverlay();
}

// Update modifier's stat, image 
function updateModifierLevel(modifierDiv, currentLevelPos) {
    const modifierID = HTMLUtil.getDataID(modifierDiv);
    const modifier = modifierListManager.getModifier(modifierID);
    const key = LocalStorageUtils.getObjectKey(type, "offense", modifierID);       

    modifier.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);
    const overlayDiv = modifierDiv.querySelector(".overlay");
    if (modifier.isMaxLevel()) {
        HTMLUtil.addLevelOverlayMaxedClass(overlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(overlayDiv);
    }
    modifierDiv.querySelector(".level").textContent = modifier.getCurrentLevel();
    modifierDiv.querySelector(".image").src = modifier.getImagePath();
}

// Called when the appropriate toggle button is pressed, update and save new value and update related offense overlay
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

// Update overlay
function updateOverlay() {
    for (const troopDiv of troopDivs) {
        updateTroopDivOverlay(troopDiv);
    }
    for (const repairDiv of repairDivs) {
        updateRepairDivOverlay(repairDiv);
    }
}

// Update overlay for troop
// Note: Death damage always takes precedence over modifiers
function updateTroopDivOverlay(troopDiv) {
    const troopID = HTMLUtil.getDataID(troopDiv);
    const troop = offenseListManager.getTroop(troopID);
    const troopModifierListManager = modifierListManager.getActiveModifierListManager(Modifier.TROOP);
    const objectContainer = troopDiv.querySelector(".object-container");
    HTMLUtil.removeChild(objectContainer, ".modifier");

    if (useTroopDeathDamage && troop.canDealDeathDamage()) {
        const modifierOverlay = HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_DEATH);
        HTMLUtil.setDataID(modifierOverlay, "death_damage");

        objectContainer.appendChild(modifierOverlay);
    } else if (!troopModifierListManager.isEmpty()) {
        const modifier = troopModifierListManager.getHighestModifier();

        const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
        HTMLUtil.setDataID(modifierOverlay, modifier.modifierID);

        objectContainer.appendChild(modifierOverlay);
    }
}

// Update overlay for repair
function updateRepairDivOverlay(repairDiv) {
    const repairModifierListManager = modifierListManager.getActiveModifierListManager(Modifier.REPAIR);
    const objectContainer = repairDiv.querySelector(".object-container");
    HTMLUtil.removeChild(objectContainer, ".modifier");

    if (!repairModifierListManager.isEmpty()) {
        const modifier = repairModifierListManager.getHighestModifier();

        const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
        HTMLUtil.setDataID(modifierOverlay, modifier.modifierID);

        objectContainer.appendChild(modifierOverlay);
    }
}