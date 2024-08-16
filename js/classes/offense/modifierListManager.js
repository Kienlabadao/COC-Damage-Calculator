class ModifierListManager {

    constructor() {
        this.modifierList = [];
    }

    loadModifier(modifierList) {
        if (Array.isArray(modifierList)) {
            for (const modifier of modifierList) {
                if (modifier instanceof Modifier) {
                    this.add(modifier);        
                } else {
                    throw new Error(`Invalid modifier: ${modifier}`);
                }               
            }
        } else {
            throw new Error(`Invalid modifierList: ${modifierList}`);
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