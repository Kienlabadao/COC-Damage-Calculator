// Calculate damage log for all defenses
function calc() {
    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
    filterDefenses();
}

// Calculate damage log for defense
function calcDefense(defenseDiv) {
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    if (defense === null) {
        throw new ReferenceError(`Invalid defenseID: ${defenseID}`);
    }

    toggleCollapseBtnText(defenseDiv.querySelector(".show-more-btn"), false);
    HTMLUtil.toggleBSCollapse(defenseDiv.querySelector(`#showMore-${defenseID}`), false);

    // Create damage log list for defense
    const damageLogDisplay = defenseDiv.querySelector(".damage-log-display");
    HTMLUtil.removeAllChilds(damageLogDisplay);
    const damageLogList = getDamageLogList(defense);

    // Add each damage log into the row of detail section of defense
    let orderCount = 0;
    for (const damageLog of damageLogList.damageLogList) {
        orderCount++;
        const damageLogRow = AdvanceHTMLUtil.createDamageLogRow(damageLog, orderCount);       
        
        damageLogDisplay.appendChild(damageLogRow);
    }

    // Update image and hp of defense div
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
}

// Create damage log list for defense
function getDamageLogList(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();

        const damageLogListManager = new DamageLogListManager();
        damageLogListManager.loadWithActionList(clonedDefense, actionListManager);
        return damageLogListManager; 
    } else {
        throw new TypeError(`Invalid defense: ${defense}`);
    }
}