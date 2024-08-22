function updateDefense(element) {
    const defenseDiv = HTMLUtil.getParentDiv(element, "defense");

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
            levelNumberSpan.classList.add("maxed-text");
        } else {
            levelNumberSpan.classList.remove("maxed-text");
        }
        defenseDiv.querySelector(".image").src = imagePath;
        defenseDiv.querySelector(".hp").textContent = defense.getCurrentMaxHP();   
    }
    calcDefense(defenseDiv);
}

function updateOffense(element) {
    const offenseDiv = HTMLUtil.getParentDiv(element, "offense");
    
    if (offenseDiv) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
        const offenseID = HTMLUtil.getDataID(offenseDiv);
        let offense = null;
        let key = null;
        if (offenseDiv.classList.contains("spell")) {
            const isDonated = HTMLUtil.getDataDonated(offenseDiv);

            offense = offenseListManager.getSpell(offenseID, isDonated);
            key = isDonated ? LocalStorageUtils.getObjectKeyDonated(type, "offense", offenseID) : LocalStorageUtils.getObjectKey(type, "offense", offenseID);
        } else if (offenseDiv.classList.contains("equipment")) {
            offense = offenseListManager.getEquipment(offenseID);
            key = LocalStorageUtils.getObjectKey(type, "offense", offenseID);
        } else {
            throw new Error(`ERROR: Div did not contain appropriate type: ${offenseDiv.classList}`);
        }
       
        const currentLevelPos = Number.parseInt(element.value);       
        offense.currentLevelPos = currentLevelPos;
        LocalStorageUtils.saveNumber(key, currentLevelPos);

        if (offenseDiv.classList.contains("equipment")) {
            updateEquipmentUsed();
        }
        
        if (offense.isMaxLevel()) {            
            HTMLUtil.addMaxedClass(overlayDiv);
        } else {
            HTMLUtil.addNotMaxedClass(overlayDiv);
        }
        offenseDiv.querySelector(".level").textContent = offense.getCurrentLevel();
    }
    calc();
}

function useDonatedZapSpell(element) {
    useDonatedZap = element.checked;
    LocalStorageUtils.saveBoolean(useDonatedZapSpellKey, useDonatedZap);

    toggleUseDonatedZapSpell(element);
    calc();  
}

function toggleUseDonatedZapSpell() {
    offenseDivs = offensesSection.querySelectorAll(".offense");

    offenseDivs.forEach((offenseDiv) => {
        const spellID = HTMLUtil.getDataID(offenseDiv);
        if (spellID === "lightning_spell") {
            if (HTMLUtil.getDataDonated(offenseDiv)) {
                if (useDonatedZap) {
                    HTMLUtil.showDiv(offenseDiv);            
                } else {
                    HTMLUtil.hideDiv(offenseDiv);
                }                
                return;
            }
        }
    });
}

function updateDonatedCount(element) {
    const warningDiv = document.getElementById("inputWarning");
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

function updateEQOrder(element) {
    eqOrder = element.value;
    LocalStorageUtils.saveString(eqOrderKey, eqOrder);
    calc();
}

function updateEquipmentUsed() {
    const equipmentDivList = [];

    for (const offense of offenseListManager.getEquipmentList()) {
        if (!offense.isMinLevel()) {
            equipmentDivList.push(ZapquakeHTMLUtil.createEquipmentDiv(offense));
        }
    }

    if (equipmentDivList.length > 0) {
        defenseDivs = defensesSection.querySelectorAll(".defense");

        defenseDivs.forEach((defenseDiv) => {        
            const equipmentListDiv = defenseDiv.querySelector(".equipment-list");
            const equipmentDiv = defenseDiv.querySelector(".equipment-div");
            const defense = defenseListManager.getDefense(HTMLUtil.getDataID(defenseDiv));

            HTMLUtil.removeAllChilds(equipmentListDiv)
            for (const equipmentDiv of equipmentDivList) {
                const equipmentNode = equipmentDiv.cloneNode(true);
                const equipment = offenseListManager.getEquipment(HTMLUtil.getDataID(equipmentNode));

                if (defense.isImmune(equipment)) {
                    equipmentNode.classList.add("overlay--immune");
                }
                equipmentListDiv.appendChild(equipmentNode);
            }
            HTMLUtil.showDiv(equipmentDiv);
        });
    } else {
        defenseDivs = defensesSection.querySelectorAll(".defense");

        defenseDivs.forEach((defenseDiv) => {
            HTMLUtil.hideDiv(defenseDiv.querySelector(".equipment-div"));
        });
    }
}