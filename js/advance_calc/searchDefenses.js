function searchDefenses(element) {
    const searchString = element.value.trim().toLowerCase();
    const defensesDiv = defensesSection.querySelectorAll('.defense');

    defensesDiv.forEach((defenseDiv) => {
        const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseDiv);

        if (!hideDestroyedDefenses || !isDestroyed) {
            const defenseID = HTMLUtil.getDataID(defenseDiv);

            if (getDefense(defenseID)["name"].toLowerCase().includes(searchString)) {
                HTMLUtil.showDiv(defenseDiv);               
            } else {
                HTMLUtil.hideDiv(defenseDiv);
            }
        }      
    });  
}