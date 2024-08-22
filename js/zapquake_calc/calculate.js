function calc() {
    defenseDivs = defensesSection.querySelectorAll(".defense");

    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
}

function canEquipmentDestroy(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        
        for (const equipment of offenseListManager.getEquipmentList()) {
            equipment.calcRemainingHP(clonedDefense);
        }
        return clonedDefense.isDestroyed();        
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}

function calcDefense(defenseDiv) {
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    
    if (defense === null) {
        throw new Error(`Invalid defenseID: ${defenseID}`);
    }

    const showMoreButton = defenseDiv.querySelector(".show-more-btn");
    showMoreButton.textContent = "Show More";
    const collapseDiv = defenseDiv.querySelector(`#showMore-${defenseID}`);
    const collapse = new bootstrap.Collapse(collapseDiv, {
        toggle: false
    })
    collapse.hide();
    if (!canEquipmentDestroy(defense)) {
        const spellDiv = defenseDiv.querySelector(".spell-div");
        HTMLUtil.showDiv(spellDiv);
        const statusDiv = defenseDiv.querySelector(".status-div");
        HTMLUtil.hideDiv(statusDiv);
        const collapseBtn = defenseDiv.querySelector(".collapse-btn");
        HTMLUtil.hideDiv(collapseBtn);

        const spellCountLists = getSpellCountLists(defense);

        if (spellCountLists.length > 0) {
            const spellMainDisplayDiv = HTMLUtil.removeAllChilds(defenseDiv.querySelector(".spell-main-display"));
            const spellDisplayDiv = HTMLUtil.removeAllChilds(defenseDiv.querySelector(".spell-display"));

            let isMainDisplay = true;
            for (const spellCountListManager of spellCountLists) {
                const nodeArray = ZapquakeHTMLUtil.createSpellNodeArray(spellCountListManager);
                
                if (isMainDisplay) {
                    HTMLUtil.appendAllChilds(spellMainDisplayDiv, nodeArray);
                    isMainDisplay = false;
                } else {
                    const spellsContainerDiv = document.createElement('div');
                    spellsContainerDiv.className = "d-flex justify-content-center align-items-center gap-2 mt-2";

                    HTMLUtil.appendAllChilds(spellsContainerDiv, nodeArray);
                    spellDisplayDiv.appendChild(spellsContainerDiv);
                }
            }

            if (spellCountLists.length > 1) {
                HTMLUtil.showDiv(collapseBtn);
            }
        } else {
            setImpossibleStatus(defenseDiv);
        }
    } else {
        setDestroyedStatus(defenseDiv);
    }
}

function getSpellCountLists(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        const spellCountLists = [];

        for (let maxEQSpellCount = 1; maxEQSpellCount <= maxSpellCount; maxEQSpellCount++) {
            const damageLogListManager = new DamageLogListManager();
            const spellCountListManager = new SpellCountListManager();

            damageLogListManager.loadWithOffenseOrderList(clonedDefense, getOffenseOrderList(maxEQSpellCount, clonedDefense));

            const damageLog = damageLogListManager.getLast();
            if (damageLog instanceof DamageLog && damageLog.remainingHP <= 0) {
                spellCountListManager.load(damageLogListManager);
                spellCountLists.push(spellCountListManager);

                if (spellCountListManager.getLength() === 1) {
                    break;
                }
            } else {
                if (spellCountLists.length !== 0) {
                    break;
                }            
            }
        }
        return spellCountLists; 
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}

function getOffenseOrderList(maxEQSpellCount, defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        const offenseOrderList = [];
        const eqBoots = offenseListManager.getEquipment(eqBootsKey);
        const eqSpell = offenseListManager.getSpell(eqSpellKey, false);
        const donatedZapSpell = offenseListManager.getSpell(zapSpellKey, true);
        const zapSpell = offenseListManager.getSpell(zapSpellKey, false);
        let spellCount = 0;

        for (const equipment of offenseListManager.getEquipmentList()) {
            if (!equipment.isDamageTypeEQ()) {
                offenseOrderList.push(equipment);
            }
        }

        switch (eqOrder) {
            case eqBootsKey:
                offenseOrderList.push(eqBoots);

                if (!clonedDefense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
                    for (let eqSpellCount = 1; eqSpellCount <= maxEQSpellCount; eqSpellCount++) {
                        offenseOrderList.push(eqSpell);
                        spellCount++;
                    }       
                }           
                break;
            case eqSpellKey:
                if (!clonedDefense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
                    for (let eqSpellCount = 1; eqSpellCount <= maxEQSpellCount; eqSpellCount++) {
                        offenseOrderList.push(eqSpell);
                        spellCount++;
                    }
                }

                offenseOrderList.push(eqBoots);
                break;
            default:
                throw new Error(`Invalid eqOrder: ${eqOrder}`);
        }
        
        if (useDonatedZap) {
            for (let zapSpellCount = 1; zapSpellCount <= donatedZapSpellCount; zapSpellCount++) {
                if (spellCount < maxSpellCount) {
                    offenseOrderList.push(donatedZapSpell);
                    spellCount++;
                } else {
                    break;
                }
            }
        }

        while (spellCount < maxSpellCount) {
            offenseOrderList.push(zapSpell);
            spellCount++;
        }
        return offenseOrderList;
    } else {
        throw new Error(`Invalid defense: ${defense}`);   
    }   
}

function setDestroyedStatus(defenseDiv) {
    const spellDiv = defenseDiv.querySelector(".spell-div");
    HTMLUtil.hideDiv(spellDiv);

    const statusDiv = defenseDiv.querySelector(".status-div");
    HTMLUtil.showDiv(statusDiv);
    const statusImg = statusDiv.querySelector(".image");
    statusImg.setAttribute('src', "/images/other/champion_king.webp");
    const statusText = statusDiv.querySelector(".info");
    statusText.textContent = "That heroes equipment setup is enough to destroy this defense without any spells needed. Huzzah! 🎉";
}

function setImpossibleStatus(defenseDiv) {
    const spellDiv = defenseDiv.querySelector(".spell-div");
    HTMLUtil.hideDiv(spellDiv);

    const statusDiv = defenseDiv.querySelector(".status-div");
    HTMLUtil.showDiv(statusDiv);
    const statusImg = statusDiv.querySelector(".image");
    statusImg.setAttribute('src', "/images/other/raged-barbarian.png");
    const statusText = statusDiv.querySelector(".info");
    statusText.textContent = "It's impossible to destroy this defense with setup. Womp womp! 😔";
}