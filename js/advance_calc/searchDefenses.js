const emptySearchStatusDiv = document.getElementById("emptySearchStatus");
const emptySearchStatusImg = emptySearchStatusDiv.querySelector(".status-container__img");
const emptySearchStatusText = emptySearchStatusDiv.querySelector(".status-container__text");
const emptySearchImgPath = "/images/other/confused.webp";

// Called when toggle button is preesed
// Update filter status and start filter
function toggleHideDestroyedDefenses(element) {
    isHideDestroyedDefenses = element.checked;
    LocalStorageUtils.saveBoolean(hideDestroyedDefensesKey, isHideDestroyedDefenses);
    filterDefenses();
}

function toggleHideSurvivedDefenses(element) {
    isHideSurvivedDefenses = element.checked;
    LocalStorageUtils.saveBoolean(hideSurvivedDefensesKey, isHideSurvivedDefenses);
    filterDefenses();
}

// Get list of available defenses, filter it, then update appropriate div
function filterDefenses() {
    let defenseNodes = Array.from(defenseDivs);
    const maxDefenseCount = defenseNodes.length;

    if (isHideDestroyedDefenses) {
        defenseNodes = hideDestroyedDefenses(defenseNodes);
    }
    if (isHideSurvivedDefenses) {
        defenseNodes = hideSurvivedDefenses(defenseNodes);
    }
    defenseNodes = searchDefenses(defenseNodes);

    updateDefenseCount(defenseNodes, maxDefenseCount);
    if (defenseNodes.length === 0) {
        showEmptySearchStatus();
    } else {
        hideEmptySearchStatus();
    }
}

// Get list of visible defenses, filter them based on if its destroyed or not, then return the list of defenses that still visible after filter
function hideDestroyedDefenses(defenseNodes) {
    if (Array.isArray(defenseNodes)) {
        const defenseVisibleNodes = [];

        defenseNodes.forEach(defenseNode => {
            const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseNode);
            
            if (isDestroyed) {
                HTMLUtil.hideDiv(defenseNode);               
            } else {
                HTMLUtil.showDiv(defenseNode);
                defenseVisibleNodes.push(defenseNode);
            }
        });

        return defenseVisibleNodes;
    } else {
        throw new TypeError(`Invalid defenseNodes: ${defenseNodes}`);
    }
}

// Get list of visible defenses, filter them based on if its survived or not, then return the list of defenses that still visible after filter
function hideSurvivedDefenses(defenseNodes) {
    if (Array.isArray(defenseNodes)) {
        const defenseVisibleNodes = [];

        defenseNodes.forEach(defenseNode => {
            const isDestroyed = !HTMLUtil.getDataDefenseStatus(defenseNode);

            if (!isDestroyed) {
                HTMLUtil.hideDiv(defenseNode);                                       
            } else {
                HTMLUtil.showDiv(defenseNode);
                defenseVisibleNodes.push(defenseNode); 
            }
        });

        return defenseVisibleNodes;
    } else {
        throw new TypeError(`Invalid defenseNodes: ${defenseNodes}`);
    }
}

// Get list of visible defenses, filter them based on search string, then return the list of defenses that still visible after filter
function searchDefenses(defenseNodes) {
    if (Array.isArray(defenseNodes)) {
        const defenseVisibleNodes = [];
        const searchString = searchDefenseBox.value.trim().toLowerCase();

        defenseNodes.forEach((defenseNode) => {
            const defenseID = HTMLUtil.getDataID(defenseNode);
            const defense = defenseListManager.getDefense(defenseID);    
            if (defense === null) {
                throw new ReferenceError(`Invalid defenseID: ${defenseID}`);
            }

            if (defense.name.toLowerCase().includes(searchString)) {
                HTMLUtil.showDiv(defenseNode);
                defenseVisibleNodes.push(defenseNode);
            } else {
                HTMLUtil.hideDiv(defenseNode);
            }     
        });

        return defenseVisibleNodes;
    } else {
        throw new TypeError(`Invalid defenseNodes: ${defenseNodes}`);
    }
}

// Update defense counter
function updateDefenseCount(defenseNodes, maxDefenseCount) {
    if (Array.isArray(defenseNodes)) {
        const count = defenseNodes.length;

        if (count < 2) {
            defenseCountBox.textContent = `Defense Count: ${count}/${maxDefenseCount}`;
        } else {
            defenseCountBox.textContent = `Defenses Count: ${count}/${maxDefenseCount}`;
        }
    } else {
        throw new TypeError(`Invalid defenseNodes: ${defenseNodes}`);
    }
}

// Toggle empty search status when there is no match found
function showEmptySearchStatus() {
    HTMLUtil.showDiv(emptySearchStatusDiv);
    emptySearchStatusImg.src = emptySearchImgPath;
    emptySearchStatusText.textContent = "Uh oh! It looks like our Barbarian couldn't find any defenses that match your search. Maybe try broadening your search filter?";
}

function hideEmptySearchStatus() {
    HTMLUtil.showDiv(emptySearchStatusDiv);
    emptySearchStatusImg.src = "";
    emptySearchStatusText.textContent = "";
}