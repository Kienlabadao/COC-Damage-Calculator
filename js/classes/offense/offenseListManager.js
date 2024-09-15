class OffenseListManager {

    // Store list of offenses
    // For more details about what does offense do, check offense class (and its variants too)

    constructor() {
        if (OffenseListManager.instance) {
            return OffenseListManager.instance;
        }

        OffenseListManager.instance = this;
        this._offenseList = []; 
    }
    
    // Load all offenses based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (depend on which calculate type, check each function to see exact default value)
    loadKey(type) {
        switch (type) {
            case "simple":
                this.loadSpellWithKey(type); 
                this.loadEquipmentWithKey(type);
                break;
            default:
                this.loadSpellWithKey(type); 
                this.loadEquipmentWithKey(type);
                this.loadTroopWithKey(type);
                this.loadRepairWithKey(type);
        }
    }

    // Load all spells based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level)
    // Spell donation will also be set to false
    loadSpellWithKey(type) {
        for (const spellID of Object.keys(getAllSpells())) {
            let useOffense;
            if (type === "simple") {
                const useOffenseKey = LocalStorageUtils.getUseObjectKey(type, "offense", spellID);
                useOffense = LocalStorageUtils.loadBoolean(useOffenseKey, false);
            } else {
                useOffense = true;
            }        
            const spell = new Spell(spellID, null, useOffense);
            const key = LocalStorageUtils.getObjectKey(type, "offense", spellID);        
            spell.currentLevelPos = LocalStorageUtils.loadNumber(key, spell.currentLevelPos);

            this.add(spell);
        }
    }

    // Load all equipments based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (0 for zapquake calculator, max level for other)
    loadEquipmentWithKey(type) {
        for (const equipmentID of Object.keys(getAllEquipments())) {
            let useOffense;
            if (type === "simple") {
                const useOffenseKey = LocalStorageUtils.getUseObjectKey(type, "offense", equipmentID);
                useOffense = LocalStorageUtils.loadBoolean(useOffenseKey, false);
            } else {
                useOffense = true;
            }
            const equipment = new Equipment(equipmentID, null, useOffense);
            const key = LocalStorageUtils.getObjectKey(type, "offense", equipmentID);
            equipment.currentLevelPos = LocalStorageUtils.loadNumber(key, equipment.currentLevelPos);

            this.add(equipment);
        }
    }

    // Load all troops based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level)
    loadTroopWithKey(type) {
        for (const troopID of Object.keys(getAllTroops())) {
            let useOffense;
            if (type === "simple") {
                const useOffenseKey = LocalStorageUtils.getUseObjectKey(type, "offense", troopID);
                useOffense = LocalStorageUtils.loadBoolean(useOffenseKey, false);
            } else {
                useOffense = true;
            }
            const troop = new Troop(troopID, null, useOffense);
            const key = LocalStorageUtils.getObjectKey(type, "offense", troopID);

            troop.currentLevelPos = LocalStorageUtils.loadNumber(key, troop.currentLevelPos);
            if (useTroopDeathDamage) {
                troop.damageMode = Troop.DEATH_DAMAGE;
            }
    
            this.add(troop);
        }
    }

    // Load all repairs based on json file
    // Current level is set to user choices (which is stored in localStorage)
    // If there is none (storage reset or first time visit), then it's set to default (max level)
    loadRepairWithKey(type) {
        for (const repairID of Object.keys(getAllRepairs())) {
            let useOffense;
            if (type === "simple") {
                const useOffenseKey = LocalStorageUtils.getUseObjectKey(type, "offense", repairID);
                useOffense = LocalStorageUtils.loadBoolean(useOffenseKey, false);
            } else {
                useOffense = true;
            }
            const repair = new Repair(repairID, null, useOffense);
            const key = LocalStorageUtils.getObjectKey(type, "offense", repairID);

            repair.currentLevelPos = LocalStorageUtils.loadNumber(key, repair.currentLevelPos);
      
            this.add(repair);
        }
    }

    // Get offense based on its ID
    // Note: If used to find spell, it will return the first one it finds, regardless of donated or not
    getOffense(offenseID) {
        for (const offense of this.offenseList) {
            if (offense.offenseID === offenseID) {
                return offense;
            }
        }
        return null;
    }

    // Get equipment based on its ID
    getEquipment(equipmentID) {
        for (const equipment of this.getEquipmentList()) {
            if (equipment.offenseID === equipmentID) {
                return equipment;
            }
        }
        return null;
    }

    // Get equipment based on its ID and if it were donated
    getSpell(spellID, isDonated) {
        for (const spell of this.getSpellList()) {
            if (spell.offenseID === spellID) {
                if (spell.isDonated === isDonated) {
                    return spell;
                }               
            }
        }
        return null;
    }

    // Get troop based on its ID
    getTroop(troopID) {
        for (const troop of this.getTroopList()) {
            if (troop.offenseID === troopID) {
                return troop;
            }
        }
        return null;
    }

    // Get repair based on its ID
    getRepair(repairID) {
        for (const repair of this.getRepairList()) {
            if (repair.offenseID === repairID) {
                return repair;
            }
        }
        return null;
    }

    // Get a list of all equipments
    getEquipmentList() {
        const equipmentList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Equipment) {
                equipmentList.push(offense);
            }
        }
        return equipmentList;
    }

    // Get a list of all spells
    getSpellList() {
        const spellList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Spell) {
                spellList.push(offense);
            }
        }
        return spellList;
    }

    // Get a list of all troops
    getTroopList() {
        const troopList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Troop) {
                troopList.push(offense);
            }
        }
        return troopList;
    }

    // Get a list of all repairs
    getRepairList() {
        const repairList = [];
        for (const offense of this.offenseList) {
            if (offense instanceof Repair) {
                repairList.push(offense);
            }
        }
        return repairList;
    }

    // Add new offense and check for unique
    add(newOffense) {
        if (newOffense instanceof Offense) {
            if (!this.contain(newOffense)) {
                this.offenseList.push(newOffense);
            } else {
                throw new Error(`Offense already exist: ${newOffense}`);
            }  
        } else {
            throw new Error(`Invalid newOffense: ${newOffense}`);
        }            
    }

    // Add new donated spell and check for unique
    addDonatedSpell(spellID, type) {
        for (const offenseID of Object.keys(getAllSpells())) {
            if (offenseID === spellID) {
                const useOffenseKey = LocalStorageUtils.getUseObjectKeyDonated(type, "offense", spellID);
                const useOffense = LocalStorageUtils.loadBoolean(useOffenseKey, false);
                const spell = new Spell(spellID, null, useOffense, true);
                spell.currentLevelPos = LocalStorageUtils.loadNumber(LocalStorageUtils.getObjectKeyDonated(type, "offense", spellID), spell.currentLevelPos);

                this.add(spell);
                return;
            }            
        }
        throw new Error(`Invalid spellID: ${spellID}`);
    }

    // Check if offense already exist in the list
    contain(checkOffense) {
        for (const offense of this.offenseList) {
            if (offense.compare(checkOffense)) {
                return true;
            }
        }
        return false;
    }

    getLength() {
        return this.offenseList.length;
    }

    isEmpty() {
        return this.getLength() === 0;
    }

    get offenseList() {
        return this._offenseList;
    }
}