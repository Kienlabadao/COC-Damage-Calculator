function calc() {
    defenseDivs = defensesSection.querySelectorAll(".defense");

    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
}

function calcDefense(defenseDiv) {
    const defenseID = getDataTitle(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    if (defense === null) {
        throw new Error(`Invalid defenseID: ${defenseID}`);
    }

    const showMoreButton = defenseDiv.querySelector(".show-more-button");
    showMoreButton.textContent = "Show";
    const collapseDiv = defenseDiv.querySelector(".collapse");
    const collapse = new bootstrap.Collapse(collapseDiv, {
        toggle: false
    })
    collapse.hide();
    const actionDisplay = defenseDiv.querySelector(".action-display");
    removeAllChilds(actionDisplay);
    const offenseDamageList = getOffenseDamageList(defense);

    for (const offenseDamage of offenseDamageList.getOffenseDamageList()) {
        const actionRow = createActionTableRow(offenseDamage, defense);
        
        actionDisplay.appendChild(actionRow);
    }

    const defenseImg = defenseDiv.querySelector(".image");
    const defenseHP = defenseDiv.querySelector(".hp");
    const maxHP = defense.getCurrentHP();
    let remainingHP = maxHP;
    if (!offenseDamageList.isEmpty()) {
        remainingHP = offenseDamageList.getLast().remainingHP;
    }

    defenseHP.classList.remove("full-hp");
    defenseHP.classList.remove("destroyed");
    defenseHP.textContent = remainingHP;
    setDataDefenseStatus(defenseDiv, true);
    if (remainingHP === maxHP) {
        defenseHP.classList.add("full-hp"); 
        defenseImg.src = defense.getImagePath();    
    } else if (remainingHP <= 0) {
        defenseHP.classList.add("destroyed");
        setDataDefenseStatus(defenseDiv, false);
        defenseImg.src = defense.getDestroyedImagePath();
    } else {
        defenseImg.src = defense.getImagePath();
    }
    toggleDefenseDivVisibility();
}

// Get a list of each spell composition that needed to destroy a defense
// Structure inside list: [[Spell1. Spell1 count], [Spell2. Spell2 count], ...]
// Ex: [[eqSpell. 3], [zapSpell. 5], ...]
function getOffenseDamageList(defense) {
    if (defense instanceof Defense) {
        const offenseDamageListManager = new OffenseDamageListManager();
        offenseDamageListManager.loadWithActionList(defense, actionListManager);
        return offenseDamageListManager; 
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}