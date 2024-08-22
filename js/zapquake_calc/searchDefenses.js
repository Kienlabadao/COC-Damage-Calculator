function searchDefenses(element) {
    const searchString = element.value.trim().toLowerCase();
    const defensesDiv = defensesSection.querySelectorAll('.defense');

    defensesDiv.forEach((defenseDiv) => {
        const defenseID = HTMLUtil.getDataID(defenseDiv);

        if (getDefense(defenseID)["name"].toLowerCase().includes(searchString)) {
            HTMLUtil.showDiv(defenseDiv);
        } else {
            HTMLUtil.hideDiv(defenseDiv);
        }
    });  
}