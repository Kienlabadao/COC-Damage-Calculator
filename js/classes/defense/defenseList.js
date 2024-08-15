class DefenseList {
    constructor() {
        this.defenseList = [];
    }

    load() {
        this.load(undefined); 
    }

    load(type) {
        for (const defenseID of Object.keys(getAllDefenses())) {
            const defense = new Defense(defenseID, null);
            defense.currentLevelPos = LocalStorageUtils.loadNumber(LocalStorageUtils.getObjectKey(type, defenseID), defense.currentLevelPos);

            this.addOffense(defense);
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

    addOffense(newDefense) {
        for (const defense of this.defenseList) {
            if (defense.defenseID === newDefense.defenseID) {
                throw new Error(`DefenseID already exist: ${newDefense.defenseID}`);
            }
        }
        this.defenseList.push(newDefense);
    }
}