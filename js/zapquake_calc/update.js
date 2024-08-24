// Update defense's stat, image, and recalculate when user change the level of defense
function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");
    const currentLevelPos = Number.parseInt(element.value);
    if (defenseDiv) {
        updateDefenseLevel(defenseDiv, currentLevelPos);           
    } else {
        throw new Error(`Invalid defenseDiv: ${defenseDiv}`);
    }
    calcDefense(defenseDiv);
}

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

// Update offense's stat, image, and recalculate every defenses when user change the level of offense
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

function updateOffenseLevel(offenseDiv, currentLevelPos) {
    const offenseID = HTMLUtil.getDataID(offenseDiv);
    let offense = null;
    let key = null;
    if (Offense.isOffenseDivType(offenseDiv, Offense.SPELL)) {
        const isDonated = HTMLUtil.getDataDonated(offenseDiv);

        offense = offenseListManager.getSpell(offenseID, isDonated);
        key = isDonated ? LocalStorageUtils.getObjectKeyDonated(type, "offense", offenseID) : LocalStorageUtils.getObjectKey(type, "offense", offenseID);
    } else if (Offense.isOffenseDivType(offenseDiv, Offense.EQUIPMENT)) {
        offense = offenseListManager.getEquipment(offenseID);
        key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);
    } else {
        throw new Error(`ERROR: Div did not contain appropriate type: ${offenseDiv.classList}`);
    }
         
    offense.currentLevelPos = currentLevelPos;
    LocalStorageUtils.saveNumber(key, currentLevelPos);

    if (Offense.isOffenseDivType(offenseDiv, Offense.EQUIPMENT)) {
        updateEquipmentUsed();
    }
    
    const overlayDiv = offenseDiv.querySelector(".overlay");
    if (offense.isMaxLevel()) {            
        HTMLUtil.addLevelOverlayMaxedClass(overlayDiv);
    } else {
        HTMLUtil.removeLevelOverlayMaxedClass(overlayDiv);
    }
    offenseDiv.querySelector(".level").textContent = offense.getCurrentLevel();
}

// Update, toggle donated lightning spell div, and recalculate when user interact with use donated spell checkbox
function useDonatedZapSpell(element) {
    useDonatedZap = element.checked;
    LocalStorageUtils.saveBoolean(useDonatedZapSpellKey, useDonatedZap);

    toggleUseDonatedZapSpell();
    calc();  
}

// Toggle donated lightning spell div visibility
function toggleUseDonatedZapSpell() {
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
        for (const equipment of offenseListManager.getEquipmentList()) {
            if (!equipment.isMinLevel()) {
                equipmentDivList.push(ZapquakeHTMLUtil.createEquipmentDiv(equipment, defense));
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