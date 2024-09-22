// Calculate spell composition for all defenses
function calc() {
    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
}

// Check if the equipment composition chosen by user can destroy a defense without any spells needed
function canEquipmentDestroy(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        
        for (const hero of offenseListManager.getHeroList()) {
            for (const equipment of hero.equipmentListManager.equipmentList) {
                if (equipment.isEnabled) {
                    const clonedHero = hero.clone();
                    clonedHero.setActiveEquipment(equipment.equipmentID);
                    clonedHero.calcRemainingHP(clonedDefense);
                }
            }
        }
        return clonedDefense.isDestroyed();        
    } else {
        throw new TypeError(`Invalid defense: ${defense}`);
    }
}

// Calculate spell composition for defense
function calcDefense(defenseDiv) {
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);    
    if (defense === null) {
        throw new TypeError(`Invalid defenseID: ${defenseID}`);
    }

    toggleCollapseBtnText(defenseDiv.querySelector(".show-more-btn"), false);
    HTMLUtil.toggleBSCollapse(defenseDiv.querySelector(`#showMore-${defenseID}`), false);

    if (!canEquipmentDestroy(defense)) {
        HTMLUtil.showDiv(defenseDiv.querySelector(".spell-div"));
        HTMLUtil.hideDiv(defenseDiv.querySelector(".status-div"));
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
                    spellDisplayDiv.appendChild(ZapquakeHTMLUtil.createSpellsContainerDiv(nodeArray));
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

// Get list of possible spell compositions that can destroy a defense based on user choices
function getSpellCountLists(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        const spellCountLists = [];

        for (let maxEQSpellCount = 1; maxEQSpellCount <= maxSpellCount; maxEQSpellCount++) {
            const damageLogListManager = new DamageLogListManager();
            damageLogListManager.loadWithActionList(clonedDefense, createActionList(maxEQSpellCount, clonedDefense));

            const spellCountListManager = new SpellCountListManager();
            const damageLog = damageLogListManager.getLast();
            if (!damageLogListManager.isEmpty() && damageLog.defense.isDestroyed()) {
                spellCountListManager.load(damageLogListManager);
                spellCountListManager.reverse();
                spellCountLists.push(spellCountListManager);

                // Check if there is only 1 spell type needed to destroy this defense
                // If true then either user only select 1 spell type, this defense immune to all spells that user select except 1, or only eq spell are needed to destroy it
                // Either way, return the list as there is no point continuing
                if (spellCountListManager.getLength() === 1) {
                    break;
                }
            } else {
                // This spell composition cannot destroy this defense
                // Unless there is already a composition that able to destroy this defense, go to the next composition
                if (spellCountLists.length !== 0) {
                    break;
                }            
            }
        }
        return spellCountLists; 
    } else {
        throw new TypeError(`Invalid defense: ${defense}`);
    }
}

// Create action execution order to later record its damage dealt on the defense
function createActionList(maxEQSpellCount, defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();
        const actionListManager = new ActionListManager();
        const eqBootsKing = offenseListManager.getHero(barbKingKey).clone();
        const eqBoots = eqBootsKing.getEquipment(eqBootsKey);
        const eqSpell = offenseListManager.getSpell(eqSpellKey, false);
        const donatedZapSpell = offenseListManager.getSpell(zapSpellKey, true);
        const zapSpell = offenseListManager.getSpell(zapSpellKey, false);
        let spellCount = 0;

        // Add equipment that doesn't deal eq damage into the order list
        for (const hero of offenseListManager.getHeroList()) {
            for (const equipment of hero.equipmentListManager.equipmentList) {
                if (equipment.isEnabled && !equipment.isDamageTypeEQ()) {
                    const clonedHero = hero.clone();
                    clonedHero.setActiveEquipment(equipment.equipmentID);
                    actionListManager.add(new Action(clonedHero, null));
                }
            }
        }

        // Based on user's eq order choice, add eq damage offense in the correct order
        // This matter because eq deal less damage the more its target got hit by eq type offense
        // Note: While damage log does check if defense immune to eq type offense, defense immune to eq spell still need to be checked here as this affect the number of remaining spells for later spell (lightning spell)
        switch (eqOrder) {
            case eqBootsKey:
                if (eqBoots.isEnabled) {
                    eqBootsKing.setActiveEquipment(eqBootsKey);
                    actionListManager.add(new Action(eqBootsKing, null));
                }

                if (!clonedDefense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
                    for (let eqSpellCount = 1; eqSpellCount <= maxEQSpellCount; eqSpellCount++) {
                        actionListManager.add(new Action(eqSpell, null));
                        spellCount++;
                    }       
                }           
                break;
            case eqSpellKey:
                if (!clonedDefense.isImmune(eqSpell) && !eqSpell.isMinLevel()) {
                    for (let eqSpellCount = 1; eqSpellCount <= maxEQSpellCount; eqSpellCount++) {
                        actionListManager.add(new Action(eqSpell, null));
                        spellCount++;
                    }
                }

                if (eqBoots.isEnabled) {
                    eqBootsKing.setActiveEquipment(eqBootsKey);
                    actionListManager.add(new Action(eqBootsKing, null));
                }
                break;
            default:
                throw new TypeError(`Invalid eqOrder: ${eqOrder}`);
        }
        
        // If user choose to use donated lightning spells, add the correct amount of them into the order list
        if (donatedZapSpell.isEnabled) {
            for (let zapSpellCount = 1; zapSpellCount <= donatedZapSpellCount; zapSpellCount++) {
                actionListManager.add(new Action(donatedZapSpell, null));
            }
        }
        
        // Add the remaining lightning spell into the order list
        while (spellCount < maxSpellCount) {
            actionListManager.add(new Action(zapSpell, null));
            spellCount++;
        }
        return actionListManager;
    } else {
        throw new TypeError(`Invalid defense: ${defense}`);   
    }   
}

// Set destroyed status if equipment composition chosen by user can destroy a defense without any spells needed
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

// Set impossible status if it's impossible to destroy a defense based on user choices
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