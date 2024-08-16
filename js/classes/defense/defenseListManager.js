class DefenseListManager {

    constructor() {
        this.defenseList = [];
    }

    load() {
        for (const defenseID of Object.keys(getAllDefenses())) {
            this.add(new Defense(defenseID, null));
        }
    }

    loadKey(type) {
        for (const defenseID of Object.keys(getAllDefenses())) {
            const defense = new Defense(defenseID, null);
            defense.currentLevelPos = LocalStorageUtils.loadNumber(LocalStorageUtils.getObjectKey(type, "defense", defenseID), defense.currentLevelPos);

            this.add(defense);
        }
    }

    getDefense(defenseID) {
        for (const defense of this.defenseList) {
            if (defense.defenseID === defenseID) {
                return defense;
            }
        }
        return null;
    }

    getDefenseList() {
        return this.defenseList;
    }

    contain(checkDefense) {
        for (const defense of this.defenseList) {
            if (defense.defenseID === checkDefense.defenseID) {
                return true;
            }
        }
        return false;
    }

    add(newDefense) {
        if (newDefense instanceof Defense) {
            if (!this.contain(newDefense)) {
                this.defenseList.push(newDefense);
            } else {
                throw new Error(`DefenseID already exist: ${newDefense.defenseID}`);
            }  
        } else {
            throw new Error(`Invalid newDefense: ${newDefense}`);
        }
    }
}