function toggleHideDestroyedDefenses(element) {
    hideDestroyedDefenses = element.checked;
    LocalStorageUtils.saveBoolean(hideDestroyedDefensesKey, hideDestroyedDefenses);
    toggleDefenseDivVisibility();
}

function toggleDefenseDivVisibility() {
    const defensesDiv = defensesSection.querySelectorAll('.defense');
    
    if (hideDestroyedDefenses) {
        defensesDiv.forEach((defenseDiv) => {
            const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseDiv);

            if (isDestroyed) {
                HTMLUtil.hideDiv(defenseDiv);               
            } else {
                HTMLUtil.showDiv(defenseDiv);
            }
        });
    } else {
        defensesDiv.forEach((defenseDiv) => {
            HTMLUtil.showDiv(defenseDiv);
        });   
    }
    searchDefenses(searchDefenseBox);
}

function searchDefenses(element) {
    const searchString = element.value.trim().toLowerCase();
    const defensesDiv = defensesSection.querySelectorAll('.defense');

    defensesDiv.forEach((defenseDiv) => {
        const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseDiv);

        if (!hideDestroyedDefenses || !isDestroyed) {
            const defenseID = HTMLUtil.getDataID(defenseDiv);
            const defense = defenseListManager.getDefense(defenseID);    
            if (defense === null) {
                throw new Error(`Invalid defenseID: ${defenseID}`);
            }
    
            if (defense.name.toLowerCase().includes(searchString)) {
                HTMLUtil.showDiv(defenseDiv);               
            } else {
                HTMLUtil.hideDiv(defenseDiv);
            }
        }      
    });  
}