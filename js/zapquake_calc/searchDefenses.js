// Show & hide defense div if its name match player search input
function searchDefenses(element) {
    const searchString = element.value.trim().toLowerCase();

    defenseDivs.forEach((defenseDiv) => {
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
    });  
}