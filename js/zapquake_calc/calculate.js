function calc() {
    defenseDivs = defensesSection.querySelectorAll(".defense");

    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
}

function calcDirectEquipmentDamage() {
    let equipmentDamage = 0;

    for (const equipment of offenseListManager.getEquipmentList()) {
        if (!equipment.isDamageTypeEQ()) {
            equipmentDamage += equipment.getCurrentDamage();
        }
    }
    return equipmentDamage;
}

function canEquipmentDestroy(defense) {
    if (defense instanceof Defense) {
        const directEquipmentDamage = calcDirectEquipmentDamage();
        const maxHP = defense.getCurrentHP();
        let hp = maxHP - directEquipmentDamage;
        let eqCount = 0;
        
        for (const equipment of offenseListManager.getEquipmentList()) {
            if (equipment.isDamageTypeEQ() && !defense.isImmune(equipment)) {
                hp = equipment.calcRemainingHP(hp, maxHP, eqCount);
                eqCount++;
            }
        }
        return hp <= 0;        
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}

function calcDefense(defenseDiv) {
    const defenseID = getDataTitle(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    if (defense === null) {
        throw new Error(`Invalid defenseID: ${defenseID}`);
    }

    const showMoreButton = defenseDiv.querySelector(".show-more-button");
    showMoreButton.textContent = "Show More";
    const collapseDiv = defenseDiv.querySelector(".collapse");
    const collapse = new bootstrap.Collapse(collapseDiv, {
        toggle: false
    })
    collapse.hide();
    if (!canEquipmentDestroy(defense)) {
        const spellDiv = defenseDiv.querySelector(".spell-div");
        showDiv(spellDiv);
        const statusDiv = defenseDiv.querySelector(".status-div");
        hideDiv(statusDiv);
        const collapseBtn = defenseDiv.querySelector(".collapse-btn");
        hideDiv(collapseBtn);

        const spellCountLists = getSpellCountLists(defense);

        if (spellCountLists.length > 0) {
            const spellMainDisplayDiv = removeAllChilds(defenseDiv.querySelector(".spell-main-display"));
            const spellDisplayDiv = removeAllChilds(defenseDiv.querySelector(".spell-display"));

            let isMainDisplay = true;
            for (const spellCountListManager of spellCountLists) {
                const nodeArray = createSpellNodeArray(spellCountListManager);
                
                if (isMainDisplay) {
                    appendAllChilds(spellMainDisplayDiv, nodeArray);
                    isMainDisplay = false;
                } else {
                    const spellsContainerDiv = document.createElement('div');
                    spellsContainerDiv.className = "d-flex justify-content-center align-items-center";

                    appendAllChilds(spellsContainerDiv, nodeArray);
                    spellDisplayDiv.appendChild(spellsContainerDiv);
                }
            }

            if (spellCountLists.length > 1) {
                showDiv(collapseBtn);
            }
        } else {
            setImpossibleStatus(defenseDiv);
        }
    } else {
        setDestroyedStatus(defenseDiv);
    }
}

// Get a list of each spell composition that needed to destroy a defense
// Structure inside list: [[Spell1. Spell1 count], [Spell2. Spell2 count], ...]
// Ex: [[eqSpell. 3], [zapSpell. 5], ...]
function getSpellCountLists(defense) {
    if (defense instanceof Defense) {
        const spellCountLists = [];

        for (let maxEQSpellCount = 1; maxEQSpellCount <= maxSpellCount; maxEQSpellCount++) {
            const offenseDamageListManager = new OffenseDamageListManager();
            const spellCountListManager = new SpellCountListManager();

            offenseDamageListManager.loadWithOffenseOrderList(defense, getOffenseOrderList(maxEQSpellCount, defense));
            const offenseDamage = offenseDamageListManager.getLast();
            if (offenseDamage instanceof OffenseDamage && offenseDamage.remainingHP <= 0) {
                spellCountListManager.load(offenseDamageListManager);
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

                if (!defense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
                    for (let eqSpellCount = 1; eqSpellCount <= maxEQSpellCount; eqSpellCount++) {
                        offenseOrderList.push(eqSpell);
                        spellCount++;
                    }       
                }           
                break;
            case eqSpellKey:
                if (!defense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
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
    let spellDiv = defenseDiv.querySelector(".spell-div");
    hideDiv(spellDiv);
    let statusDiv = defenseDiv.querySelector(".status-div");
    showDiv(statusDiv);
    let statusImg = defenseDiv.querySelector(".status-img");
    statusImg.setAttribute('src', "/images/other/champion_king.webp");
    let statusText = defenseDiv.querySelector(".status-text");
    statusText.textContent = "That heroes equipment setup is enough to destroy this defense without any spells needed. Huzzah! 🎉";
}

function setImpossibleStatus(defenseDiv) {
    let spellDiv = defenseDiv.querySelector(".spell-div");
    hideDiv(spellDiv);

    let statusDiv = defenseDiv.querySelector(".status-div");
    showDiv(statusDiv);
    let statusImg = defenseDiv.querySelector(".status-img");
    statusImg.setAttribute('src', "/images/other/raged-barbarian.png");
    let statusText = defenseDiv.querySelector(".status-text");
    statusText.textContent = "It's impossible to destroy this defense with setup. Womp womp! 😔";
}