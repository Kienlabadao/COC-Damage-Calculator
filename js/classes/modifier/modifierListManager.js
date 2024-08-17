class ModifierListManager {

    constructor() {
        this.modifierList = [];
    }

    load() {
        for (const modifierID of Object.keys(getAllModifiers())) {       
            this.add(new Modifier(modifierID, null, false));
        }
    }

    loadKey(type) {
        for (const modifierID of Object.keys(getAllModifiers())) {
            const key = LocalStorageUtils.getObjectKey(type, "offense", modifierID);
            const useModifierKey = LocalStorageUtils.getUseModifierKey(type, modifierID);
            const modifier = new Modifier(modifierID, null, LocalStorageUtils.loadBoolean(useModifierKey, false));
            
            modifier.currentLevelPos = LocalStorageUtils.loadNumber(key, modifier.currentLevelPos);          
            this.add(modifier);
        }
    }

    getModifier(modifierID) {
        for (const modifier of this.modifierList) {
            if (modifier.offenseID === modifierID) {
                return modifier;
            }
        }
        return null;
    }

    getActiveTroopModifierListManager() {
        const troopModifierListManager = new ModifierListManager();
        for (const modifier of this.modifierList) {
            if (modifier.isActive && modifier.isAffected(Modifier.TROOP)) {
                troopModifierListManager.add(modifier);
            }
        }
        return troopModifierListManager;
    }

    getActiveRepairModifierListManager() {
        const troopModifierListManager = new ModifierListManager();
        for (const modifier of this.modifierList) {
            if (modifier.isActive && modifier.isAffected(Modifier.REPAIR)) {
                troopModifierListManager.add(modifier);
            }
        }
        return troopModifierListManager;
    }

    getModifierList() {
        return this.modifierList;
    }

    getHighestModifier() {
        if (!this.isEmpty()) {
            const sortedModifierList = this.modifierList.sort((a, b) => b.getCurrentModify() - a.getCurrentModify());
            return sortedModifierList[0];
        } else {
            throw new Error("modifierList is empty.");
        }
    }

    contain(checkModifier) {
        for (const modifier of this.modifierList) {
            if (modifier.offenseID === checkModifier.offenseID) {
                return true;
            }
        }
        return false;
    }

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
}