function searchDefenses(element) {
    const searchString = element.value.trim().toLowerCase();
    const defensesDiv = defensesSection.querySelectorAll('.defense');

    defensesDiv.forEach((defenseDiv) => {
        const isDestroyed = !getDataDefenseStatus(defenseDiv);

        if (!hideDestroyedDefenses || !isDestroyed) {
            const defenseID = getDataTitle(defenseDiv);

            if (getDefense(defenseID)["name"].toLowerCase().includes(searchString)) {
                showDiv(defenseDiv);               
            } else {
                hideDiv(defenseDiv);
            }
        }      
    });  
}