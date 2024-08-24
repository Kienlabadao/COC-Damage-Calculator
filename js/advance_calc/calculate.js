function calc() {
    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
}

function calcDefense(defenseDiv) {
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    if (defense === null) {
        throw new Error(`Invalid defenseID: ${defenseID}`);
    }

    toggleCollapseBtnText(defenseDiv.querySelector(".show-more-btn"), false);
    HTMLUtil.toggleBSCollapse(defenseDiv.querySelector(`#showMore-${defenseID}`), false);

    const damageLogDisplay = defenseDiv.querySelector(".damage-log-display");
    HTMLUtil.removeAllChilds(damageLogDisplay);
    const damageLogList = getDamageLogList(defense);

    let orderCount = 0;
    for (const damageLog of damageLogList.damageLogList) {
        orderCount++;
        const damageLogRow = AdvanceHTMLUtil.createDamageLogRow(damageLog, orderCount);       
        
        damageLogDisplay.appendChild(damageLogRow);
    }

    const defenseImg = defenseDiv.querySelector(".image--main");
    const defenseHP = defenseDiv.querySelector(".hp");
    const maxHP = defense.getCurrentMaxHP();
    let remainingHP = maxHP;
    if (!damageLogList.isEmpty()) {
        remainingHP = damageLogList.getLast().remainingHP;
    }

    defenseHP.classList.remove("text--hp-full");
    defenseHP.classList.remove("text--destroyed");
    defenseHP.textContent = remainingHP;
    HTMLUtil.setDataDefenseStatus(defenseDiv, true);
    if (remainingHP === maxHP) {
        defenseHP.classList.add("text--hp-full"); 
        defenseImg.src = defense.getImagePath();    
    } else if (remainingHP <= 0) {
        defenseHP.classList.add("text--destroyed");
        HTMLUtil.setDataDefenseStatus(defenseDiv, false);
        defenseImg.src = defense.getDestroyedImagePath();
    } else {
        defenseImg.src = defense.getImagePath();
    }
    toggleDefenseDivVisibility();
}

function getDamageLogList(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();

        const damageLogListManager = new DamageLogListManager();
        damageLogListManager.loadWithActionList(clonedDefense, actionListManager);
        return damageLogListManager; 
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}