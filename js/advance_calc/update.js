function updateDefense(element) {
    const defenseDiv = getParentDiv(element, "defense");

    if (defenseDiv) {
        const levelNumberSpan = defenseDiv.querySelector(".level");
        const defenseID = getDataTitle(defenseDiv);
        const defense = defenseList.getDefense(defenseID);
        const key = LocalStorageUtils.getObjectKey(type, defenseID);
       
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
    calcDefense(defenseDiv);
}

function updateOffense(element) {
    const offenseDiv = getParentDiv(element, "offense");
    
    if (offenseDiv) {
        const overlayDiv = offenseDiv.querySelector(".overlay");
        const offenseID = getDataTitle(offenseDiv);
        let offense = null;
        let key = null;
        if (offenseDiv.classList.contains("spell")) {
            const isDonated = getDataDonated(offenseDiv);

            offense = offenseList.getSpell(offenseID, isDonated);
            key = isDonated ? LocalStorageUtils.getObjectKeyDonated(type, offenseID) : LocalStorageUtils.getObjectKey(type, offenseID);
        } else if (offenseDiv.classList.contains("equipment")) {
            offense = offenseList.getEquipment(offenseID);
            key = LocalStorageUtils.getObjectKey(type, offenseID);
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
            addMaxedClass(overlayDiv);
        } else {
            addNotMaxedClass(overlayDiv);
        }
        offenseDiv.querySelector(".level-number").textContent = offense.getCurrentLevel();
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
        const spellID = getDataTitle(offenseDiv);
        if (spellID === "lightning_spell") {
            if (getDataDonated(offenseDiv)) {
                if (useDonatedZap) {
                    showDiv(offenseDiv);            
                } else {
                    hideDiv(offenseDiv);
                }                
                return;
            }
        }
    });
}

function updateDonatedCount(element) {
    const warningDiv = document.getElementById("input-warning");
    const inputNumber = Number.parseInt(element.value);

    if (Number.isNaN(inputNumber)) {
        showDiv(warningDiv);
    } else {
        if (inputNumber < 0 || inputNumber > 3) {
            showDiv(warningDiv);
        } else {
            donatedZapSpellCount = inputNumber;

            LocalStorageUtils.saveNumber(donatedZapSpellCountKey, donatedZapSpellCount);
            hideDiv(warningDiv);
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

    for (const offense of offenseList.getEquipmentList()) {
        if (!offense.isMinLevel()) {
            equipmentDivList.push(createEquipmentDiv(offense));
        }
    }

    if (equipmentDivList.length > 0) {
        defenseDivs = defensesSection.querySelectorAll(".defense");

        defenseDivs.forEach((defenseDiv) => {        
            const equipmentListDiv = defenseDiv.querySelector(".equipment-list");
            const equipmentDiv = defenseDiv.querySelector(".equipment-div");
            const defense = defenseList.getDefense(getDataTitle(defenseDiv));

            removeAllChilds(equipmentListDiv)
            for (const equipmentDiv of equipmentDivList) {
                const equipmentNode = equipmentDiv.cloneNode(true);
                const equipment = offenseList.getEquipment(getDataTitle(equipmentNode));

                if (defense.isImmune(equipment)) {
                    equipmentNode.classList.add("immune");
                }
                equipmentListDiv.appendChild(equipmentNode);
            }
            showDiv(equipmentDiv);
        });
    } else {
        defenseDivs = defensesSection.querySelectorAll(".defense");

        defenseDivs.forEach((defenseDiv) => {
            hideDiv(defenseDiv.querySelector(".equipment-div"));
        });
    }
}