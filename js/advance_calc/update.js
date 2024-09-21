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
}

// Update offense's stat and image
function updateOffenseLevel(offenseDiv, currentLevelPos) {
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);
    const key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);       

    offense.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);   
    const levelOverlayDiv = offenseDiv.querySelector(".overlay.level");
    if (offense.isMaxLevel()) {
        HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
    }
    levelOverlayDiv.textContent = offense.getCurrentLevel();
    offenseDiv.querySelector(".image").src = offense.getImagePath();

    if (offense instanceof Hero) {
        heroSections.forEach((heroSection) => {
            if (HTMLUtil.getDataID(heroSection) === offense.offenseID) {
                const heroAttackDiv = heroSection.querySelector(".hero-attack");
                const heroAttackLevelOverlayDiv = heroAttackDiv.querySelector(".level");
                const damageDiv = heroAttackDiv.querySelector(".damage");

                if (offense.isMaxLevel()) {
                    HTMLUtil.addLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
                } else {
                    HTMLUtil.removeLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
                }
                heroAttackLevelOverlayDiv.textContent = offense.getCurrentLevel();
                damageDiv.textContent = offense.getCurrentDamageFormat();

                updateAllHeroEquipmentsDamage(offense);
            }
        });
    } else {
        const damageDiv = offenseDiv.querySelector(".damage");  
        damageDiv.textContent = offense.getCurrentDamageFormat();
    }
}

function updateEquipment(element) {
    const equipmentDiv = HTMLUtil.getParentDiv(element, "equipment");
    const currentLevelPos = Number.parseInt(element.value);    
    
    if (equipmentDiv) {
        updateEquipmentLevel(equipmentDiv, currentLevelPos)
    } else {
        throw new Error(`Invalid equipmentDiv: ${equipmentDiv}`);
    }
}

function updateEquipmentLevel(equipmentDiv, currentLevelPos) {
    const equipmentID = HTMLUtil.getDataID(equipmentDiv);
    const hero = offenseListManager.getHeroFromEquipment(equipmentID);
    const equipment = hero.getEquipment(equipmentID);
    const key = LocalStorageUtils.getObjectKey(type, "equipment", equipmentID);       

    equipment.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);   
    const levelOverlayDiv = equipmentDiv.querySelector(".overlay.level");
    if (equipment.isMaxLevel()) {
        HTMLUtil.addLevelOverlayMaxedClass(levelOverlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(levelOverlayDiv);
    }
    levelOverlayDiv.textContent = equipment.getCurrentLevel();

    updateHeroDamage(hero);
}

function updateHeroDamage(hero) {
    updateHeroNormalAttackDamage(hero);
    updateAllHeroEquipmentsDamage(hero);
}

function updateHeroNormalAttackDamage(hero) {
    if (hero instanceof Hero) {
        heroSections.forEach((heroSection) => {
            if (HTMLUtil.getDataID(heroSection) === hero.offenseID) {
                const heroAttackDiv = heroSection.querySelector(".hero-attack");
                console.log(hero.getCurrentDamageFormat());
                const damageDiv = heroAttackDiv.querySelector(".damage");

                damageDiv.textContent = hero.getCurrentDamageFormat();
            }
        });
    } else {
        throw new Error(`Invalid hero: ${hero}`);
    }
}

function updateAllHeroEquipmentsDamage(hero) {
    if (hero instanceof Hero) {
        heroSections.forEach((heroSection) => {
            if (HTMLUtil.getDataID(heroSection) === hero.offenseID) {
                const equipmentDivs = heroSection.querySelectorAll(".equipment");
                equipmentDivs.forEach((equipmentDiv) => {
                    updateEquipmentDamage(hero, equipmentDiv);
                });
            }
        });
    } else {
        throw new Error(`Invalid hero: ${hero}`);
    }
}

function updateEquipmentDamage(hero, equipmentDiv) {
    if (hero instanceof Hero) {
        const clonedHero = hero.clone();
        const equipmentID = HTMLUtil.getDataID(equipmentDiv);
        const equipment = clonedHero.getEquipment(equipmentID);

        if (equipment.isEquipmentTypeAttack() || equipment.isEquipmentTypeDamage()) {
            clonedHero.setActiveEquipment(equipmentID);
            const damageDiv = equipmentDiv.querySelector(".damage");
            damageDiv.textContent = clonedHero.getCurrentDamageFormat();
        }

        if (equipment.isEquipmentTypeSupport()) {
            const dpsBoostDiv = equipmentDiv.querySelector(".dps-boost");
            dpsBoostDiv.textContent = equipment.getCurrentDPSBoostFormat();
        }
    } else {
        throw new Error(`Invalid hero: ${hero}`);
    }
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

function toggleUseEquipment(element) {
    const equipmentDiv = HTMLUtil.getParentDiv(element, "equipment");
    const useEquipment = element.checked;
    const equipmentID = HTMLUtil.getDataID(equipmentDiv);
    const hero = offenseListManager.getHeroFromEquipment(equipmentID);
    const equipment = hero.getEquipment(equipmentID);

    equipment.isEnabled = useEquipment;
    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseObjectKey(type, "equipment", equipmentID), useEquipment);
    
    if (equipment.isEquipmentTypeAttack() || equipment.isEquipmentTypeDamage()) {
        const collapseDiv = equipmentDiv.querySelector(".collapse");
        if (equipment.isEnabled) {
          HTMLUtil.toggleBSCollapse(collapseDiv, true);
        } else {
          HTMLUtil.toggleBSCollapse(collapseDiv, false);
        }
    }

    updateHeroDamage(hero);
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