// Called when the slider level of defense is changed. Get the caller defense, its level to start update and recalculation
function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");
    const currentLevelPos = Number.parseInt(element.value);

    if (defenseDiv) {
        updateDefenseLevel(defenseDiv, currentLevelPos);
        calcDefense(defenseDiv);
        filterDefenses();
    } else {
        throw new TypeError(`Invalid defenseDiv: ${defenseDiv}`);
    }
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
    const offense = offenseListManager.getOffense(HTMLUtil.getDataID(offenseDiv));
    const currentLevelPos = Number.parseInt(element.value);    
    
    if (offenseDiv) {
        updateOffenseLevel(offenseDiv, currentLevelPos);
        if (offense instanceof Hero) {
            updateHeroDamage(offense);
        } else {
            updateOffenseDamage(offenseDiv);
        }
    } else {
        throw new TypeError(`Invalid offenseDiv: ${offenseDiv}`);
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

                if (offense.isMaxLevel()) {
                    HTMLUtil.addLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
                } else {
                    HTMLUtil.removeLevelOverlayMaxedClass(heroAttackLevelOverlayDiv);
                }
                heroAttackLevelOverlayDiv.textContent = offense.getCurrentLevel();
                return;
            }
        });
    }
}

function updateOffenseDamage(offenseDiv) {
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);

    if (offense) {
        const damageDiv = offenseDiv.querySelector(".damage");  
        damageDiv.textContent = offense.getCurrentDamageFormat();

        if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
            HTMLUtil.removeTextRagedClass(damageDiv);
        } else {
            if (offense.activeModifier !== null) {
                HTMLUtil.addTextRagedClass(damageDiv);
            } else {
                HTMLUtil.removeTextRagedClass(damageDiv);
            }
        }
    } else {
        throw new Error(`Invalid offenseDiv: ${offenseDiv}`);
    }
}

function updateEquipment(element) {
    const equipmentDiv = HTMLUtil.getParentDiv(element, "equipment");
    const hero = offenseListManager.getHeroFromEquipment(HTMLUtil.getDataID(equipmentDiv));
    const currentLevelPos = Number.parseInt(element.value);    
    
    if (equipmentDiv) {
        updateEquipmentLevel(equipmentDiv, currentLevelPos);
        updateHeroDamage(hero);
    } else {
        throw new TypeError(`Invalid equipmentDiv: ${equipmentDiv}`);
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
                const damageDiv = heroAttackDiv.querySelector(".damage");

                damageDiv.textContent = hero.getCurrentDamageFormat();
                if (hero.activeModifier !== null) {
                    HTMLUtil.addTextRagedClass(damageDiv);
                } else {
                    HTMLUtil.removeTextRagedClass(damageDiv);
                }
                return;
            }
        });
    } else {
        throw new TypeError(`Invalid hero: ${hero}`);
    }
}

function updateAllHeroEquipmentsDamage(hero) {
    if (hero instanceof Hero) {
        heroSections.forEach((heroSection) => {
            if (HTMLUtil.getDataID(heroSection) === hero.offenseID) {
                const equipmentDivs = AdvanceHTMLUtil.getAllEquipmentDivsFromHeroSection(heroSection);
                equipmentDivs.forEach((equipmentDiv) => {
                    updateEquipmentDamage(hero, equipmentDiv);
                });
                return;
            }
        });
    } else {
        throw new TypeError(`Invalid hero: ${hero}`);
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

            if (equipment.isEquipmentTypeAttack()) {
                if (hero.activeModifier !== null) {
                    HTMLUtil.addTextRagedClass(damageDiv);
                } else {
                    HTMLUtil.removeTextRagedClass(damageDiv);
                }
            }
        }

        if (equipment.isEquipmentTypeSupport()) {
            const dpsBoostDiv = equipmentDiv.querySelector(".dps-boost");
            dpsBoostDiv.textContent = equipment.getCurrentDPSBoostFormat();

            if (hero.activeModifier !== null) {
                HTMLUtil.addTextRagedClass(dpsBoostDiv);
            } else {
                HTMLUtil.removeTextRagedClass(dpsBoostDiv);
            }
        }
    } else {
        throw new TypeError(`Invalid hero: ${hero}`);
    }
}

// Called when the slider level of modifier is changed. Get the caller modifier, its level to start update itself and and related offense overlay
function updateModifier(element) {
    const modifierDiv = HTMLUtil.getParentDiv(element, "modifier");
    const currentLevelPos = Number.parseInt(element.value);
    
    if (modifierDiv) {
        updateModifierLevel(modifierDiv, currentLevelPos);
        updateModifierModify(modifierDiv);
        updateAllOffensesModifier();
    } else {
        throw new TypeError(`Invalid modifierDiv: ${modifierDiv}`);
    }
}

// Update modifier's stat, image 
function updateModifierLevel(modifierDiv, currentLevelPos) {
    const modifierID = HTMLUtil.getDataID(modifierDiv);
    const modifier = modifierListManager.getModifier(modifierID);
    const key = LocalStorageUtils.getObjectKey(type, "modifier", modifierID);       

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

function updateModifierModify(modifierDiv) {
    const modifierID = HTMLUtil.getDataID(modifierDiv);
    const modifier = modifierListManager.getModifier(modifierID);

    if (modifier) {
        const modifyDiv = modifierDiv.querySelector(".modify");  
        modifyDiv.textContent = modifier.getCurrentModifyFormat();
    } else {
        throw new TypeError(`Invalid modifierDiv: ${modifierDiv}`);
    }
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
    console.log(offenseListManager);
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

    updateAllOffensesModifier();
}

function toggleUseTroopDeathDamage(element) {
    useTroopDeathDamage = element.checked;
    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseTroopDeathDamageKey(type), useTroopDeathDamage);
    console.log(useTroopDeathDamage);
    for (const troop of offenseListManager.getTroopList()) {
        if (useTroopDeathDamage) {
            try {
                troop.damageMode = Troop.DEATH_DAMAGE;
            } catch (error) {
                if (error instanceof TypeError) {
                    throw error;
                } else {
                    continue;
                }
            }

            for (const troopDiv of troopDivs) {
                if (HTMLUtil.getDataID(troopDiv) === troop.offenseID) {
                    updateOffenseDamage(troopDiv);
                }
            }
        } else {
            troop.damageMode = Troop.DAMAGE;
            for (const troopDiv of troopDivs) {
                if (HTMLUtil.getDataID(troopDiv) === troop.offenseID) {
                    updateOffenseDamage(troopDiv);
                }
            }
        }
    }

    updateAllOffensesModifierOverlay();
}

function updateAllOffensesModifier() {
    updateActiveModifier();
    updateAllOffensesModifierOverlay();
    updateAllOffensesDamage();
}

function updateActiveModifier() {
    const activeModifierListManager = modifierListManager.getActiveModifierListManager();
    if (!activeModifierListManager.isEmpty()) {
        offenseListManager.addAllModifiers(activeModifierListManager);
    } else {
        offenseListManager.removeModifier();
    }
}

// Update overlay
function updateAllOffensesModifierOverlay() {
    for (const spellDiv of spellDivs) {
        updateOffenseModifierOverlay(spellDiv);
    }
    for (const heroSection of heroSections) {
        updateOffenseModifierOverlay(heroSection.querySelector(".hero-attack"));
        updateAllEquipmentsModifierOverlay(heroSection);
    }
    for (const troopDiv of troopDivs) {
        updateOffenseModifierOverlay(troopDiv);
    }
    for (const repairDiv of repairDivs) {
        updateOffenseModifierOverlay(repairDiv);
    }
}

function updateOffenseModifierOverlay(offenseDiv) {
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    const offense = offenseListManager.getOffense(offenseID);

    if (offense instanceof Offense) {
        const objectContainer = offenseDiv.querySelector(".object-container");
        HTMLUtil.removeChild(objectContainer, ".modifier");

        if (offense instanceof Troop && offense.damageMode === Troop.DEATH_DAMAGE) {
            const modifierOverlay = HTMLUtil.createModifierOverlay(deathDamageImage, HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_DEATH);
            HTMLUtil.setDataID(modifierOverlay, "death_damage");

            objectContainer.appendChild(modifierOverlay);
        } else {
            const modifier = offense.activeModifier;

            if (modifier !== null) {
                const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
                HTMLUtil.setDataID(modifierOverlay, modifier.modifierID);

                objectContainer.appendChild(modifierOverlay);
            }      
        }
    } else {
        throw new TypeError(`Invalid offenseDiv: ${offenseDiv}`);
    }
}

// Update overlay for troop
// Note: Death damage always takes precedence over modifiers
function updateAllEquipmentsModifierOverlay(heroSection) {
    const heroID = HTMLUtil.getDataID(heroSection);
    const hero = offenseListManager.getHero(heroID);

    if (hero instanceof Hero) {
        const equipmentDivs = AdvanceHTMLUtil.getAllEquipmentDivsFromHeroSection(heroSection);

        for (const equipmentDiv of equipmentDivs) {
            const equipmentID = HTMLUtil.getDataID(equipmentDiv);
            const equipment = hero.getEquipment(equipmentID);

            if (equipment.isEquipmentTypeAttack()) {
                const objectContainer = equipmentDiv.querySelector(".object-container");
                HTMLUtil.removeChild(objectContainer, ".modifier");

                const modifier = hero.activeModifier;

                if (modifier !== null) {
                    const modifierOverlay = HTMLUtil.createModifierOverlay(modifier.getImagePath(), HTMLUtil.OVERLAY_NORMAL, HTMLUtil.MODIFIER_RAGED);
                    HTMLUtil.setDataID(modifierOverlay, modifier.modifierID);

                    objectContainer.appendChild(modifierOverlay);
                }
            }
        }
    } else {
        throw new TypeError(`Invalid heroSection: ${heroSection}`);
    }
}

function updateAllOffensesDamage() {
    for (const spellDiv of spellDivs) {
        updateOffenseDamage(spellDiv);
    }
    for (const hero of offenseListManager.getHeroList()) {
        updateHeroDamage(hero);
    }
    for (const troopDiv of troopDivs) {
        updateOffenseDamage(troopDiv);
    }
    for (const repairDiv of repairDivs) {
        updateOffenseDamage(repairDiv);
    }
}