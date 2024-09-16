class ModifierListManager {

    // Store list of modifiers
    // For more details about what does modifier do, check modifier class

    constructor() {
        this._modifierList = [];
    }

    // Load all modifiers based on json file
    // Current level and activation is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level and false. respectively)
    loadKey(type) {
        for (const modifierID of Object.keys(getAllModifiers())) {
            const key = LocalStorageUtils.getObjectKey(type, "modifier", modifierID);
            const useModifierKey = LocalStorageUtils.getUseModifierKey(type, modifierID);
            const modifier = new Modifier(modifierID, null, LocalStorageUtils.loadBoolean(useModifierKey, false));
            
            try {
                modifier.currentLevelPos = LocalStorageUtils.loadNumber(key, modifier.currentLevelPos); 
            } catch(error) {
                console.warn(error);
                console.warn("Invalid level found! Revert to default level.");
                LocalStorageUtils.saveNumber(key, modifier.currentLevelPos);
            }                   
            this.add(modifier);
        }
    }

    // Get modifier based on its ID
    getModifier(modifierID) {
        for (const modifier of this.modifierList) {
            if (modifier.modifierID === modifierID) {
                return modifier;
            }
        }
        return null;
    }

    // Get list of modifiers that affect a certain type and is active (enabled by user)
    getActiveModifierListManager(modifierType) {
        const troopModifierListManager = new ModifierListManager();
        for (const modifier of this.modifierList) {
            if (modifier.isActive && modifier.isAffected(modifierType)) {
                troopModifierListManager.add(modifier);
            }
        }
        return troopModifierListManager;
    }

    // Return the modifier with highest modify
    getHighestModifier() {
        if (!this.isEmpty()) {
            const sortedModifierList = this.modifierList.sort((a, b) => b.getCurrentModify() - a.getCurrentModify());
            return sortedModifierList[0];
        } else {
            throw new Error("modifierList is empty.");
        }
    }

    // Check if modifier already exist in the list
    contain(checkModifier) {
        for (const modifier of this.modifierList) {
            if (modifier.compare(checkModifier)) {
                return true;
            }
        }
        return false;
    }

    // Add new modifier and check for unique
    add(newModifier) {
        if (newModifier instanceof Modifier) {
            if (!this.contain(newModifier)) {
                this.modifierList.push(newModifier);
            } else {
                throw new Error(`Modifier already exist: ${newModifier}`);
            }
        } else {
            throw new Error(`Invalid newModifier: ${newModifier}`);
        }              
    }

    getLength() {
        return this.modifierList.length;
    }

    isEmpty() {
        return this.getLength() === 0;
    }

    // Getter
    get modifierList() {
        return this._modifierList;
    }
}