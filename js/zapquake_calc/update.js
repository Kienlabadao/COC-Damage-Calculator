// Called when the slider level of defense is changed. Get the caller defense, its level to start update
function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");
    const currentLevelPos = Number.parseInt(element.value);
    if (defenseDiv) {
        updateDefenseLevel(defenseDiv, currentLevelPos);           
    } else {
        throw new TypeError(`Invalid defenseDiv: ${defenseDiv}`);
    }
    calcDefense(defenseDiv);
}

// Update defense's stat, image, and recalculate when user change the level of defense
function updateDefenseLevel(defenseDiv, currentLevelPos) {
    const levelNumberSpan = defenseDiv.querySelector(".level");
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    const key = LocalStorageUtils.getObjectKey(type, "defense", defenseID);   
        
    defense.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);
    const imagePath = defense.getImagePath();
    const maxHP = defense.getCurrentMaxHP();   

    levelNumberSpan.textContent = defense.getCurrentLevel();
    if (defense.isMaxLevel()) {
        HTMLUtil.addTextMaxedClass(levelNumberSpan);
    } else {
        HTMLUtil.removeTextMaxedClass(levelNumberSpan);
    }
    defenseDiv.querySelector(".image--main").src = imagePath;
    defenseDiv.querySelector(".hp").textContent = maxHP;
}

// Called when the slider level of offense is changed. Get the caller offense, its level to start update
function updateOffense(element) {
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");
    const currentLevelPos = Number.parseInt(element.value);    
    
    if (offenseDiv) {
        updateOffenseLevel(offenseDiv, currentLevelPos)
    } else {
        throw new TypeError(`Invalid offenseDiv: ${offenseDiv}`);
    }      
    calc();
}

// Update offense's stat, image, and recalculate every defenses when user change the level of offense
function updateOffenseLevel(offenseDiv, currentLevelPos) {
    if (Offense.isOffenseDivType(offenseDiv, Offense.SPELL)) {
        updateSpellLevel(offenseDiv, currentLevelPos);
    } else if (offenseDiv.classList.contains("equipment")) {
        updateEquipmentLevel(offenseDiv, currentLevelPos);
    } else {
        throw new TypeError(`Div did not contain appropriate type: ${offenseDiv.classList}`);
    }
}

function updateSpellLevel(spellDiv, currentLevelPos) {
    const spellID = HTMLUtil.getDataID(spellDiv);
    const isDonated = HTMLUtil.getDataDonated(spellDiv);
    const spell = offenseListManager.getSpell(spellID, isDonated);
    const key = isDonated ? LocalStorageUtils.getObjectKeyDonated(type, "offense", spellID) : LocalStorageUtils.getObjectKey(type, "offense", spellID);

    spell.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);

    const overlayDiv = spellDiv.querySelector(".overlay");
    if (spell.isMaxLevel()) {            
        HTMLUtil.addLevelOverlayMaxedClass(overlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(overlayDiv);
    }
    spellDiv.querySelector(".level").textContent = spell.getCurrentLevel();

    const damageDiv = spellDiv.querySelector(".damage");  
    damageDiv.textContent = spell.getCurrentDamageFormat();
}

function updateEquipmentLevel(equipmentDiv, currentLevelPos) {
    const equipmentID = HTMLUtil.getDataID(equipmentDiv);
    const equipment = offenseListManager.getEquipmentFromHero(equipmentID);   
    const key = LocalStorageUtils.getObjectKey(type, "equipment", equipmentID);

    equipment.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);
    updateEquipmentUsed();

    const overlayDiv = equipmentDiv.querySelector(".overlay");
    if (equipment.isMaxLevel()) {            
        HTMLUtil.addLevelOverlayMaxedClass(overlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(overlayDiv);
    }
    equipmentDiv.querySelector(".level").textContent = equipment.getCurrentLevel();

    const damageDiv = equipmentDiv.querySelector(".damage");  
    damageDiv.textContent = equipment.getCurrentDamageFormat();
}

function toggleUseSpell(element) {
    const spellDiv = HTMLUtil.getParentDiv(element, "offense");
    const useSpell = element.checked;
    const spellID = HTMLUtil.getDataID(spellDiv);
    const isDonated = HTMLUtil.getDataDonated(spellDiv);
    const spell = offenseListManager.getSpell(spellID, isDonated);

    spell.isEnabled = useSpell;

    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseObjectKey(type, "offense", spellID), useSpell);
    calc();
}

function toggleUseEquipment(element) {
    const equipmentDiv = HTMLUtil.getParentDiv(element, "offense");
    const useEquipment = element.checked;
    const equipmentID = HTMLUtil.getDataID(equipmentDiv);
    const equipment = offenseListManager.getEquipmentFromHero(equipmentID);  

    equipment.isEnabled = useEquipment;

    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseObjectKey(type, "equipment", equipmentID), useEquipment);
    updateEquipmentUsed();
    calc();
}

// Update, toggle donated lightning spell div, and recalculate when user interact with use donated spell checkbox
function useDonatedZapSpell(element) {
    const donatedZapSpell = offenseListManager.getSpell(zapSpellKey, true);

    useDonatedZap = element.checked;
    donatedZapSpell.isEnabled = useDonatedZap;
    LocalStorageUtils.saveBoolean(LocalStorageUtils.getUseObjectKeyDonated(type, "offense", zapSpellKey), useDonatedZap);

    toggleDonatedZapSpellDiv(useDonatedZap);
    calc();  
}

// Toggle donated lightning spell div visibility
function toggleDonatedZapSpellDiv(useDonatedZap) {
    spellDivs.forEach((spellDIv) => {
        const spellID = HTMLUtil.getDataID(spellDIv);
        if (spellID === zapSpellKey && HTMLUtil.getDataDonated(spellDIv)) {
            if (useDonatedZap) {
                HTMLUtil.showDiv(spellDIv);            
            } else {
                HTMLUtil.hideDiv(spellDIv);
            }                
            return;
        }
    });
}

// Check user input, warn user if invalid input or out of range. Otherwise, update the number of donated lightning spells used and recalculate
function updateDonatedCount(element) {
    const inputNumber = Number.parseInt(element.value);

    if (Number.isNaN(inputNumber)) {
        HTMLUtil.showDiv(warningDiv);
    } else {
        if (inputNumber < 0 || inputNumber > 3) {
            HTMLUtil.showDiv(warningDiv);
        } else {
            donatedZapSpellCount = inputNumber;

            LocalStorageUtils.saveNumber(donatedZapSpellCountKey, donatedZapSpellCount);
            HTMLUtil.hideDiv(warningDiv);
            calc();
        }       
    }
}

// Update, save user choice, and recalculate when user choose in eq order dropdown
function updateEQOrder(element) {
    eqOrder = element.value;
    LocalStorageUtils.saveString(eqOrderKey, eqOrder);
    calc();
}

// Update list of used equipments for every defense divs
function updateEquipmentUsed() {
    defenseDivs.forEach((defenseDiv) => {        
        const equipmentListDiv = defenseDiv.querySelector(".equipment-list");
        const equipmentDiv = defenseDiv.querySelector(".equipment-div");
        const defense = defenseListManager.getDefense(HTMLUtil.getDataID(defenseDiv));

        const equipmentDivList = [];
        for (const hero of offenseListManager.getHeroList()) {
            for (const equipment of hero.equipmentListManager.equipmentList) {

                if (equipment.isEnabled) {
                    const clonedHero = hero.clone();
                    clonedHero.setActiveEquipment(equipment.equipmentID);
                    equipmentDivList.push(ZapquakeHTMLUtil.createEquipmentDiv(clonedHero, defense));
                }
            }
        }

        if (equipmentDivList.length > 0) {           
            HTMLUtil.removeAllChilds(equipmentListDiv);
            HTMLUtil.appendAllChilds(equipmentListDiv, equipmentDivList);
            HTMLUtil.showDiv(equipmentDiv);
        } else {
            // List will alway empty, so hide all equipment divs and stop
            defenseDivs.forEach((defenseDiv) => {
                HTMLUtil.hideDiv(defenseDiv.querySelector(".equipment-div"));
            });
            return;
        }
    });
}