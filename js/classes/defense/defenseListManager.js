class DefenseListManager {

    // Store list of defenses
    // For more details about what does defense do, check defense class

    constructor() {
        this._defenseList = [];
    }

    createDefense(defenseID, type) {
        const defense = new Defense(defenseID, null);
        defense.sourceType = type; // "defense" | "temporary_defense"
        return defense;
    }

    // Load all defenses based on json file
    // Current level is set to default (max level)
    load() {
        const normal = getAllDefenses();
        const temp = getAllTemporaryDefenses();

        for (const defenseID of Object.keys(normal)) {
            this.add(this.createDefense(defenseID, "defense"));
        }

        for (const defenseID of Object.keys(temp)) {
            this.add(this.createDefense(defenseID, "temporary_defense"));
        }
    }

    // Load all defenses based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level)
    loadKey(type) {
        const normal = getAllDefenses();
        const temp = getAllTemporaryDefenses();

        for (const defenseID of Object.keys(normal)) {
            const defense = this.createDefense(defenseID, "defense");

            defense.currentLevelPos = LocalStorageUtils.loadNumber(
                LocalStorageUtils.getObjectKey(type, "defense", defenseID),
                defense.currentLevelPos
            );

            this.add(defense);
        }

        for (const defenseID of Object.keys(temp)) {
            const defense = this.createDefense(defenseID, "temporary_defense");

            defense.currentLevelPos = LocalStorageUtils.loadNumber(
                LocalStorageUtils.getObjectKey(type, "temporary_defense", defenseID),
                defense.currentLevelPos
            );

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