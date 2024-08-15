function searchDefenses(element) {
    let searchString = element.value.trim().toLowerCase();
    let defensesDiv = defensesSection.querySelectorAll('.defense');

    defensesDiv.forEach((defenseDiv) => {
        let defenseID = getDataTitle(defenseDiv);

        if (getDefense(defenseID)["name"].toLowerCase().includes(searchString)) {
            showDiv(defenseDiv)
        } else {
            hideDiv(defenseDiv)
        }
    });  
}