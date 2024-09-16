class DefenseListManager {

    // Store list of defenses
    // For more details about what does defense do, check defense class

    constructor() {
        if (DefenseListManager.instance) {
            return ModifierListManager.instance;
        }

        DefenseListManager.instance = this;
        this._defenseList = [];
    }

    // Load all defenses based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level)
    loadKey(type) {
        for (const defenseID of Object.keys(getAllDefenses())) {
            const defense = new Defense(defenseID, null);            
            const key = LocalStorageUtils.getObjectKey(type, "defense", defenseID);

            try {
                defense.currentLevelPos = LocalStorageUtils.loadNumber(key, defense.currentLevelPos);
            } catch(error) {
                console.warn(error);
                console.warn("Invalid level found! Revert to default level.");
                LocalStorageUtils.saveNumber(key, defense.currentLevelPos);
            } 
            this.add(defense);
        }
    }

    // Get defense based on its ID
    getDefense(defenseID) {
        for (const defense of this.defenseList) {
            if (defense.defenseID === defenseID) {
                return defense;
            }
        }
        return null;
    }

    // Check if defense already exist in the list
    contain(checkDefense) {
        for (const defense of this.defenseList) {
            if (defense.compare(checkDefense)) {
                return true;
            }
        }
        return false;
    }

    // Add new defense and check for unique
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

    getLength() {
        return this.defenseList.length;
    }

    isEmpty() {
        return this.getLength() === 0;
    }

    // Getter
    get defenseList() {
        return this._defenseList;
    }
}